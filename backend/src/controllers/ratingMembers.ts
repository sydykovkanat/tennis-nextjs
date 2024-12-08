import { NextFunction, Request, Response } from 'express';
import { RatingMember } from '../model/RatingMember';
import mongoose from 'mongoose';
import { clearImages } from '../utils/multer';

export const getRatingMembers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const ratingMembers = await RatingMember.find().sort({ place: 1 });

    return res.send(ratingMembers);
  } catch (error) {
    return next(error);
  }
};

export const createRatingMember = async (req: Request, res: Response, next: NextFunction) => {
  const uploadedImage = req.file ? req.file.filename : null;

  try {
    const { name, gender, place, ratingType } = req.body;

    const maxParticipants = getMaxParticipants(ratingType);
    if (maxParticipants === null) {
      if (uploadedImage) clearImages(uploadedImage);
      return res.status(400).send({ error: 'Неверный тип рейтинга' });
    }

    const participantCount = await RatingMember.countDocuments({ ratingType });
    if (participantCount >= maxParticipants) {
      if (uploadedImage) clearImages(uploadedImage);
      return res
        .status(400)
        .send({ error: `В данном топе уже максимальное количество участников (${maxParticipants})` });
    }

    const existingMember = await RatingMember.findOne({ name });
    if (existingMember) {
      if (uploadedImage) clearImages(uploadedImage); // Удаляем файл
      return res.status(400).send({ error: 'Данное имя уже занято!' });
    }

    const ratingMember = await RatingMember.create({
      name,
      image: uploadedImage,
      gender,
      place,
      ratingType,
    });

    return res.send(ratingMember);
  } catch (error) {
    if (uploadedImage) clearImages(uploadedImage);
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
};

export const deleteRatingMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const existingMember = await findRatingMemberById(id, res);
    if (!existingMember) return;

    const result = await RatingMember.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      clearImages(existingMember.image);
    }

    return res.send({ message: 'Rating member deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const updateRatingMember = async (req: Request, res: Response, next: NextFunction) => {
  const uploadedImage = req.file ? req.file.filename : null;

  try {
    const { id } = req.params;
    const { name, ratingType } = req.body;

    const existingMember = await findRatingMemberById(id, res);
    if (!existingMember) {
      if (uploadedImage) clearImages(uploadedImage);
      return;
    }

    const maxParticipants = getMaxParticipants(ratingType);
    if (maxParticipants === null) {
      if (uploadedImage) clearImages(uploadedImage);
      return res.status(400).send({ error: 'Неверный тип рейтинга' });
    }

    const participantCount = await RatingMember.countDocuments({ ratingType });
    if (participantCount >= maxParticipants && ratingType !== existingMember.ratingType) {
      if (uploadedImage) clearImages(uploadedImage);
      return res
        .status(400)
        .send({ error: `В данном топе уже максимальное количество участников (${maxParticipants})` });
    }

    if (name && name !== existingMember.name) {
      const existingName = await RatingMember.findOne({ name });
      if (existingName) {
        if (uploadedImage) clearImages(uploadedImage);
        return res.status(400).send({ error: 'Данное имя уже занято!' });
      }
    }

    const updatedData = { ...req.body };
    if (uploadedImage) {
      updatedData.image = uploadedImage;
    }

    const updatedRatingMember = await RatingMember.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!updatedRatingMember) {
      if (uploadedImage) clearImages(uploadedImage);
      return res.status(404).send({ error: 'Участник рейтинга не найден' });
    }

    if (uploadedImage && existingMember.image !== uploadedImage) {
      clearImages(existingMember.image);
    }

    return res.send({ message: 'Участник рейтинга успешно обновлен', updatedRatingMember });
  } catch (error) {
    if (uploadedImage) clearImages(uploadedImage);
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
};

export const updateRatingMembersCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { mensRatingCategoryTop8, mensRatingCategoryTop3, womensRatingCategoryTop3 } = req.body;

    const hasAnyMember = await RatingMember.exists({});

    if (!hasAnyMember) {
      return res.status(400).send({ error: 'Добавьте хотя бы одного участника в рейтинг перед изменением категорий' });
    }

    await RatingMember.updateMany(
      {},
      {
        mensRatingCategoryTop8,
        mensRatingCategoryTop3,
        womensRatingCategoryTop3,
      }
    );

    res.send({ message: 'Категории рейтингов успешно обновлены' });
  } catch (error) {
    next(error);
  }
};

const findRatingMemberById = async (id: string, res: Response) => {
  const member = await RatingMember.findById(id);
  if (!member) {
    res.status(404).send({ error: 'Rating member not found' });
    return null;
  }
  return member;
};

function getMaxParticipants(ratingType: string): number | null {
  switch (ratingType) {
    case 'mensTop8':
      return 8;
    case 'mensTop3':
    case 'womensTop3':
      return 3;
    default:
      return null;
  }
}
