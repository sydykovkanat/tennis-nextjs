import { randomBytes } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { User } from '../model/User';
import { sendMail } from '../utils/utils';
import { RequestWithUser } from '../types/user';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, category, fullName, telephone, dateOfBirth, gender, password } = req.body;

    const user = new User({
      category,
      fullName,
      telephone,
      dateOfBirth,
      gender,
      password,
      email,
    });

    user.generateToken();
    await user.save();

    const newUser = await User.findById(user._id).populate('category');

    return res.send(newUser);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) return res.status(400).send(error);

    return next(error);
  }
};

export const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, category, fullName, telephone, dateOfBirth, gender, password, role } = req.body;

    const user = new User({
      category,
      fullName,
      telephone,
      dateOfBirth,
      gender,
      password,
      email,
      role,
    });

    user.generateToken();
    await user.save();

    return res.send({ message: 'Пользователь был создан.' });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) return res.status(400).send(error);

    return next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ telephone: req.body.telephone }).populate('category').select('+password');

    if (!user)
      return res.status(400).send({
        error: {
          messageTelephone: 'Username not found!',
        },
      });

    if (!req.body.password)
      return res.status(400).send({
        error: {
          messagePassword: 'Password is required!',
        },
      });

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch)
      return res.status(400).send({
        error: {
          messageMatching: 'Пароль не верный!',
        },
      });

    if (!user.isActive)
      return res.status(400).send({
        error: {
          messageIsActive: 'Ваш аккаунт заблокирован, чтобы связаться напишите по номеру',
        },
      });

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (error) {
    return next(error);
  }
};

export const logout = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).send({ error: 'Unauthorized!' });

    req.user.generateToken();
    await req.user.save();

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).send({ error: 'Пользователь с таким email не найден!' });

    const token = randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;

    await user.save();

    await sendMail(user, token);

    return res.send({ message: 'Ссылка для сброса пароля отправлена на ваш email.' });
  } catch (error) {
    return next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).send({ error: 'Некорректный или истёкший токен.' });

    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();
    return res.send({ message: 'Пароль успешно сброшен.' });
  } catch (error) {
    return next(error);
  }
};

export const updateProfile = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const { fullName, telephone, dateOfBirth, category, gender, email } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized!' });
    }

    const userId = req.user._id;

    const [existingTelephoneUser, existingEmailUser, user] = await Promise.all([
      User.findOne({ telephone }),
      User.findOne({ email }),
      User.findById(userId),
    ]);

    if (!user) {
      return res.status(404).json({ error: 'User not found!' });
    }

    if (existingTelephoneUser && existingTelephoneUser._id.toString() !== userId.toString()) {
      return res.status(400).json({ error: 'Пользователь с таким телефоном уже существует!' });
    }

    if (existingEmailUser && existingEmailUser._id.toString() !== userId.toString()) {
      return res.status(400).json({ error: 'Пользователь с таким email уже существует!' });
    }

    Object.assign(user, {
      ...(fullName && { fullName }),
      ...(telephone && { telephone }),
      ...(dateOfBirth && { dateOfBirth }),
      ...(category && { category }),
      ...(gender && { gender }),
      ...(email && { email }),
    });

    await user.save();

    const updatedUser = await User.findById(userId).populate('category').select('+token');
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const filter: any = {};
    if (req.body) {
      const { category, telephone, fullName, role } = req.query;

      if (category && category !== 'all') {
        filter.category = category;
      }
      if (telephone) {
        filter.telephone = { $regex: telephone, $options: 'i' };
      }
      if (fullName) {
        filter.fullName = { $regex: fullName, $options: 'i' };
      }
      if (role) {
        filter.role = { $regex: role, $options: 'i' };
      }
    }

    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const startIndex = (page - 1) * limit;

    const users = await User.find(filter).populate('category').skip(startIndex).limit(limit).lean();

    const total = await User.countDocuments(filter);
    const pages = limit > 0 ? Math.ceil(total / limit) : null;

    return res.status(200).send({ page, limit, total, pages, data: users });
  } catch (error) {
    next(error);
  }
};

export const getOneUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id).populate('category');
    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

export const getPermissionLevel = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.role === 'user' && user.isActive) {
        return res.status(200).send({ permissionLevel: 1 });
      } else if (user.role === 'moderator') {
        return res.status(200).send({ permissionLevel: 2 });
      } else if (user.role === 'admin') {
        return res.status(200).send({ permissionLevel: 3 });
      } else {
        return res.status(200).send({ permissionLevel: 0 });
      }
    } else {
      return res.status(200).send({ permissionLevel: 0 });
    }
  } catch (error) {
    next(error);
  }
};

export const updateCurrentProfile = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const { fullName, telephone, dateOfBirth, category, gender, email, role } = req.body;
    const [existingTelephoneUser, existingEmailUser, user] = await Promise.all([
      User.findOne({ telephone }),
      User.findOne({ email }),
      User.findById(id),
    ]);

    if (!user) {
      return res.status(404).json({ error: 'User not found!' });
    }

    if (existingTelephoneUser && existingTelephoneUser._id.toString() !== id.toString()) {
      return res.status(400).json({ error: 'Пользователь с таким телефоном уже существует!' });
    }

    if (existingEmailUser && existingEmailUser._id.toString() !== id.toString()) {
      return res.status(400).json({ error: 'Пользователь с таким email уже существует!' });
    }

    Object.assign(user, {
      ...(fullName && { fullName }),
      ...(telephone && { telephone }),
      ...(dateOfBirth && { dateOfBirth }),
      ...(category && { category }),
      ...(gender && { gender }),
      ...(email && { email }),
      ...(role && { role }),
    });

    await user.save();

    const updatedUser = await User.findById(id).populate('category');
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const updateActiveStatus = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (!req.params.id) {
      res.status(400).send({ error: 'Id items params must be in url' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({ error: 'User not found' });

    await User.findByIdAndUpdate(req.params.id, { isActive: !user.isActive });

    return res.send('Статус пользователя был обновлен');
  } catch (error) {
    next(error);
  }
};

export const updateRoleStatus = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (!req.params.id) {
      res.status(400).send({ error: 'Id items params must be in url' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({ error: 'User not found' });

    const updatedRole = user.role === 'user' ? 'moderator' : 'user';
    await User.findByIdAndUpdate(req.params.id, { role: updatedRole });

    return res.send('Статус пользователя был обновлен');
  } catch (error) {
    next(error);
  }
};
