import { Partner } from '../model/Partner';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import config from '../../config';
import compressImage from '../utils/compressImage';
import { clearImages } from '../utils/multer';

export const getPartners = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const partners = await Partner.find();

    return res.send(partners);
  } catch (error) {
    return next(error);
  }
};

export const createNewPartner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, url } = req.body;

    if (req.file) {
      const imagePath = path.join(config.publicPath, req.file.filename);
      await compressImage(imagePath);
    }

    const partner = await Partner.create({
      name,
      url,
      image: req.file ? req.file.filename : null,
    });

    return res.send(partner);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) return res.status(400).send(error);
    return next(error);
  }
};

export const removePartner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: _id } = req.params;

    const partner = await Partner.findOne({ _id });
    if (!partner) return res.status(404).send({ error: 'Partner not found!' });

    const result = await Partner.deleteOne({ _id });

    if (result.deletedCount === 1) {
      clearImages(partner.image);
    }

    return res.status(204).send({ message: 'Partner removed successfully' });
  } catch (error) {
    return next(error);
  }
};

export const updatePartner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, url } = req.body;

    const partner = await Partner.findById(id);
    if (!partner) return res.status(404).send({ error: 'Not found' });

    if (req.file) {
      const imagePath = path.join(config.publicPath, req.file.filename);
      await compressImage(imagePath);
    }

    const partnerData = {
      name: name || partner.name,
      url: url || partner.url,
      image: req.file?.filename || req.body.image,
    };

    const updatedPartner = await Partner.findByIdAndUpdate(id, partnerData, { new: true, runValidators: true });

    if (!updatedPartner) return res.status(404).send({ error: 'Partner not found or failed to update' });

    if (partner.image !== partnerData.image) {
      clearImages(partner.image);
    }

    return res.send(updatedPartner);
  } catch (e) {
    next(e);
  }
};

export const getOnePartner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const partner = await Partner.findById(req.params.id);

    if (!partner) {
      return res.status(404).send({ message: 'Partner not found' });
    }

    return res.send(partner);
  } catch (error) {
    return next(error);
  }
};
