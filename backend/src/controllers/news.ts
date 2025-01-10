import { format, isValid, parseISO } from 'date-fns';
import { NextFunction, Request, Response } from 'express';
import { Error, Types } from 'mongoose';
import { News } from '../model/News';
import { clearImages } from '../utils/multer';
import { processImages } from '../utils/processNewsImages';

export const createNewPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, subtitle, content } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    await processImages(files);

    const news = await News.create({
      title,
      subtitle,
      content,
      newsCover: files['newsCover'] && files['newsCover'][0] ? files['newsCover'][0].filename : '',
      images: files['images'] ? files['images'].map((file) => file.filename) : [],
    });

    return res.send(news);
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      return res.status(422).send(e);
    }

    return next(e);
  }
};

export const getNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dateFormat = 'dd.MM.yyyy';
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 12;
    const startIndex = (page - 1) * limit;
    const filter: { createdAt?: { $gte: Date; $lte: Date }; _id?: { $ne: string } } = {};

    if (req.query.startDate && req.query.endDate) {
      const startDate = parseISO(req.query.startDate as string);
      const endDate = parseISO(req.query.endDate as string);

      if (isValid(startDate) && isValid(endDate)) {
        filter.createdAt = { $gte: startDate, $lte: endDate };
      }
    }

    if (req.query.excludeId) {
      filter._id = { $ne: req.query.excludeId as string };
    }

    const news = await News.find(filter)
      .select('title subtitle newsCover createdAt updatedAt')
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .lean();

    const formattedNews = news.map((item) => ({
      ...item,
      createdAt: format(item.createdAt, dateFormat),
      updatedAt: format(item.updatedAt, dateFormat),
    }));

    const total = await News.countDocuments(filter);
    const pages = limit > 0 ? Math.ceil(total / limit) : null;

    return res.send({ page, limit, total, pages, data: formattedNews });
  } catch (e) {
    return next(e);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) return res.status(404).send({ error: 'Неправильный тип id!' });

    const newsId = new Types.ObjectId(id);
    const newsById = await News.findById(newsId).lean();

    if (!newsById) return res.status(404).send({ error: 'Новость не найдена!' });

    const formattedNews = {
      ...newsById,
      createdAt: format(newsById.createdAt, 'dd.MM.yyyy'),
      updatedAt: format(newsById.updatedAt, 'dd.MM.yyyy'),
    };

    return res.send(formattedNews);
  } catch (e) {
    return next(e);
  }
};

export const updateNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).send({ error: 'Неправильный id!' });
    }

    const id = new Types.ObjectId(req.params.id);
    const { title, subtitle, content, images } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const existingNews = await News.findById(id);

    if (!existingNews) {
      return res.status(404).send({ error: 'Новость не найдена!' });
    }

    await processImages(files);

    const updatedNewsCover = files['newsCover'] && files['newsCover'][0].filename;
    const existingImages = existingNews.images || [];
    const newImages = files['images'] ? files['images'].map((file) => file.filename) : [];
    const removedImages = images ? existingImages.filter((image) => !images.includes(image)) : [];
    let finalImages: string[];

    (images ? removedImages : existingImages).forEach(clearImages);
    if (updatedNewsCover) {
      clearImages(existingNews.newsCover as string);
    }
    // images are data that already exists
    switch (true) {
      case removedImages.length > 0 && newImages.length === 0: {
        finalImages = existingImages.filter((image) => !removedImages.includes(image));
        break;
      }
      case removedImages.length > 0 && newImages.length > 0: {
        finalImages = [...existingImages.filter((image) => !removedImages.includes(image)), ...newImages];
        break;
      }
      case !images && newImages.length > 0: {
        finalImages = [...newImages];
        break;
      }
      default: {
        finalImages = [...existingImages, ...newImages];
      }
    }

    const newsData = {
      title: title || existingNews.title,
      subtitle: subtitle || existingNews.subtitle,
      content: content || existingNews.content,
      newsCover: updatedNewsCover || existingNews.newsCover,
      images: finalImages,
    };

    const updatedNews = await News.findByIdAndUpdate(id, newsData, { new: true, runValidators: true });
    if (!updatedNews) return res.status(404).send({ error: 'Новость не найдена или ошибка при сохранении!' });

    return res.send(updatedNews);
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      return res.status(422).send(e);
    }

    return next(e);
  }
};

export const removeNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).send({ error: 'Неправильный тип id!' });
    }

    const id = req.params.id;
    const news = await News.findById(id);

    if (!news) {
      return res.status(404).send({ error: 'Новость не найдена!' });
    }

    const result = await News.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      clearImages(news.newsCover as string);
      news.images?.length && news.images.forEach(clearImages);
    }

    return res.send({ message: 'Новость успешно удалена!' });
  } catch (e) {
    return next(e);
  }
};
