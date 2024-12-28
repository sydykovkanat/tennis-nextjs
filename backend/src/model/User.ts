import type { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
import { randomUUID } from 'node:crypto';
import bcrypt from 'bcrypt';
import { UserFields, UserMethods, UserModel } from '../types/user';

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema<UserFields, UserModel, UserMethods>(
  {
    category: {
      type: String,
      ref: 'Category',
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    telephone: {
      type: String,
      required: true,
      unique: true,
      trim: true,

      validate: {
        validator: async function (value: string): Promise<boolean> {
          if (!(this as HydratedDocument<UserFields>).isModified('telephone')) {
            return true;
          }

          const user = await User.findOne({ telephone: value });
          return !user;
        },
        message: 'Пользователь с таким телефоном уже существует!',
      },
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
      trim: true,
    },
    token: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'moderator', 'admin'],
      default: 'user',
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    resetPasswordToken: { type: String, default: null, select: false },
    resetPasswordExpires: { type: Date, default: null, select: false },
  },
  { timestamps: true }
);

UserSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

export const User = mongoose.model<UserFields, UserModel>('User', UserSchema);
