import mongoose from 'mongoose';
import { PartnerFields } from '../types/partner';

const Schema = mongoose.Schema;

const PartnerSchema = new Schema<PartnerFields>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Partner = mongoose.model('Partner', PartnerSchema);
