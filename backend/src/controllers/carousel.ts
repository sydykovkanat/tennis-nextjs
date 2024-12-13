import { Carousel } from '../model/Carousel';
import { NextFunction, Request, Response } from 'express';
import path from 'path';
import config from '../../config';
import compressImage from '../utils/compressImage';
import { clearImages } from '../utils/multer';

export const getCarousel = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const photos = await Carousel.find().select('image video').lean();
    return res.send(photos);
  } catch (error) {
    return next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) return res.status(400).send({ error: 'File field is required' });

    const fileType = req.file.mimetype.startsWith('video') ? 'video' : 'image';
    const filePath = path.join(
      config.publicPath,
      fileType === 'video' ? 'videos' : 'images/imgCarousel',
      req.file.filename
    );

    if (fileType === 'image') {
      await compressImage(filePath);
    }

    const carousel = await Carousel.create({
      [fileType]: `${fileType === 'video' ? 'videos' : 'images/imgCarousel'}/${req.file.filename}`,
    });

    return res.status(201).send(carousel);
  } catch (error) {
    return next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const count = await Carousel.countDocuments();

    if (count <= 2) {
      return res
        .status(400)
        .send({ error: 'Не удается удалить изображение. В карусели должно быть не менее 2 изображений.' });
    }

    const id = req.params.id;
    const carouselItem = await Carousel.findById(id);

    if (!carouselItem) {
      return res.status(404).send({ error: 'Изображение не найдено!' });
    }

    const result = await Carousel.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      if (carouselItem.image) {
        clearImages(carouselItem.image);
      }
      if (carouselItem.video) {
        clearImages(carouselItem.video);
      }
    }

    return res.status(200).send({ message: 'Image deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!req.file) return res.status(400).send({ error: 'Image field is required' });

    const carouselItem = await Carousel.findById(id);

    if (!carouselItem) return res.status(404).send({ error: 'Image not found' });

    const fileType = req.file.mimetype.startsWith('video') ? 'video' : 'image';
    const filePath = path.join(
      config.publicPath,
      fileType === 'video' ? 'videos' : 'images/imgCarousel',
      req.file.filename
    );

    if (fileType === 'image') {
      await compressImage(filePath);
    }

    if (fileType === 'image') {
      if (carouselItem.video) {
        clearImages(carouselItem.video);
        carouselItem.video = undefined;
      }

      if (carouselItem.image) {
        clearImages(carouselItem.image);
      }
    } else if (fileType === 'video') {
      if (carouselItem.image) {
        clearImages(carouselItem.image);
        carouselItem.image = undefined;
      }

      if (carouselItem.video) {
        clearImages(carouselItem.video);
      }
    }

    carouselItem[fileType] =
      fileType === 'video' ? `videos/${req.file.filename}` : `images/imgCarousel/${req.file.filename}`;

    await carouselItem.save();
    return res.status(200).send({ message: 'Image updated successfully', carouselItem });
  } catch (error) {
    return next(error);
  }
};
