import fs from 'fs/promises';
import sharp from 'sharp';
import path from 'path';

const MAX_SIZE_MB = 1;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const compressImage = async (imagePath: string): Promise<void> => {
  const fileExtension = path.extname(imagePath).toLowerCase();

  if (fileExtension === '.gif') {
    return;
  }

  const tempImagePath = imagePath + '.tmp';
  let quality = 100;
  let fileSize = (await fs.stat(imagePath)).size;

  while (fileSize > MAX_SIZE_BYTES && quality > 10) {
    await sharp(imagePath).resize({ width: 1920, height: 1080 }).toFormat('jpeg', { quality }).toFile(tempImagePath);

    fileSize = (await fs.stat(tempImagePath)).size;

    if (fileSize <= MAX_SIZE_BYTES) {
      await fs.rename(tempImagePath, imagePath);
    }

    quality -= 5;
  }

  if (fileSize > MAX_SIZE_BYTES) {
    await fs.unlink(tempImagePath);
  }
};

export default compressImage;
