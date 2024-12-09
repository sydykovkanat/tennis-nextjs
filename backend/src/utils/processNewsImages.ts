import path from 'path';
import compressImage from './compressImage';
import config from '../../config';

export const processImages = async (files: { [fieldname: string]: Express.Multer.File[] }) => {
  if (files['newsCover'] && files['newsCover'][0]) {
    const newsCoverPath = path.join(config.publicPath, files['newsCover'][0].filename);
    await compressImage(newsCoverPath);
  }

  if (files['images']) {
    for (let file of files['images']) {
      const imagePath = path.join(config.publicPath, file.filename);
      await compressImage(imagePath);
    }
  }
};
