import multer from 'multer';
import path from 'path';
import { promises as fs } from 'fs';
import config from '../../config';
import { randomUUID } from 'crypto';
import { unlink } from 'node:fs';
import { resolve } from 'node:path';

const imageStorage = multer.diskStorage({
  destination: async (_, __, callback) => {
    const destDir = path.join(config.publicPath, 'images');
    await fs.mkdir(destDir, { recursive: true });
    callback(null, config.publicPath);
  },
  filename: (_, file, callback) => {
    const extension = path.extname(file.originalname);
    const newFilename = randomUUID() + extension;
    callback(null, 'images/' + newFilename);
  },
});

const mediaStorage = multer.diskStorage({
  destination: async (_, file, callback) => {
    const isVideo = file.mimetype.startsWith('video');
    const destDir = path.join(config.publicPath, isVideo ? 'videos' : 'images/imgCarousel');
    await fs.mkdir(destDir, { recursive: true });
    callback(null, destDir);
  },
  filename: (_, file, callback) => {
    const extension = path.extname(file.originalname);
    const newFilename = randomUUID() + extension;
    callback(null, newFilename);
  },
});

export const clearImages = (imageName: string) => {
  const imagesPath = resolve(config.publicPath, 'images');
  const filesPath = resolve(config.publicPath, 'files');
  const videosPath = resolve(config.publicPath, 'videos');
  const filePath = resolve(config.publicPath, imageName);

  if (filePath.startsWith(imagesPath)) {
    unlink(filePath, (err) => {
      if (err) {
        console.log(`File in images directory doesn't exist: ${filePath}`);
      } else {
        console.log(`Deleted file from images directory: ${filePath}`);
      }
    });
  } else if (filePath.startsWith(filesPath)) {
    unlink(filePath, (err) => {
      if (err) {
        console.log(`File in files directory doesn't exist: ${filePath}`);
      } else {
        console.log(`Deleted file from files directory: ${filePath}`);
      }
    });
  } else if (filePath.startsWith(videosPath)) {
    unlink(filePath, (err) => {
      if (err) {
        console.log(`File in videos directory doesn't exist: ${filePath}`);
      } else {
        console.log(`Deleted file from videos directory: ${filePath}`);
      }
    });
  } else {
    console.log(`Skipping deletion for file outside of images, files, or videos directories: ${imageName}`);
  }
};

const fileStorage = multer.diskStorage({
  destination: async (_, __, callback) => {
    const destDir = path.join(config.publicPath, 'files');
    await fs.mkdir(destDir, { recursive: true });
    callback(null, config.publicPath);
  },
  filename: (_, file, callback) => {
    const extension = path.extname(file.originalname);
    const newFilename = randomUUID() + extension;
    callback(null, 'files/' + newFilename);
  },
});

export const MediaUpload = multer({ storage: mediaStorage });
export const imagesUpload = multer({ storage: imageStorage });
export const filesUpload = multer({ storage: fileStorage });
