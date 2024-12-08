import type { HydratedDocument, Model } from 'mongoose';
import type { Request } from 'express';

export interface UserFields {
  fullName: string;
  telephone: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  category: string;
  avatar: string | null;
  password: string;
  token: string;
  role: 'user' | 'moderator' | 'admin';
  email: string;
  isActive: boolean;
  createdAt: Date;
  resetPasswordToken: string | null;
  resetPasswordExpires: number | null;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;

export interface RequestWithUser extends Request {
  user?: HydratedDocument<UserFields, UserMethods>;
}
