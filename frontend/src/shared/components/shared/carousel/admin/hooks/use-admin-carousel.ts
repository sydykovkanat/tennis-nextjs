'use client';

import { useAppDispatch, useAppSelector } from '@/shared/lib';
import {
  errorImgCarouselState,
  loadingCarouselState,
  photoCarouselState,
} from '@/shared/lib/features/carousel/carousel-slice';
import {
  deleteImageCarousel,
  getCarousel,
  postFetchCarousel,
  updateCarouselImage,
} from '@/shared/lib/features/carousel/carousel-thunks';
import { selectUser } from '@/shared/lib/features/users/users-slice';
import { CarouselMutation } from '@/shared/types/carousel.types';
import { toast } from 'sonner';

import React, { FormEvent, useState } from 'react';

const emptyState: CarouselMutation = {
  image: null,
  video: null,
};

export const useAdminCarousel = () => {
  const user = useAppSelector(selectUser);
  const [newImage, setNewImage] = useState<CarouselMutation>(emptyState);
  const carousel = useAppSelector(photoCarouselState);
  const dispatch = useAppDispatch();
  const loadingCarousel = useAppSelector(loadingCarouselState);
  const errorImgCarousel = useAppSelector(errorImgCarouselState);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      const fileType = file.type.startsWith('video') ? 'video' : 'image';

      setNewImage((prevState) => ({
        ...prevState,
        [fileType]: file,
      }));

      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async (event: FormEvent) => {
    event.preventDefault();
    if (!newImage.image && !newImage.video) {
      toast.warning('Выберите фото или видео!');
      return;
    }
    try {
      await dispatch(postFetchCarousel(newImage)).unwrap();
      setNewImage(emptyState);
      setPreviewUrl(null);
      await dispatch(getCarousel());
      toast.success('Файл успешно выложен');
      setAddModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('Не удалось загрузить изображение');
    }
  };

  const onDelete = async (id: string) => {
    try {
      if (carousel.length <= 2) {
        if (errorImgCarousel?.error) {
          toast.warning(errorImgCarousel.error);
        } else {
          toast.warning('Нельзя удалить файл. В карусели должно быть как минимум 2 файла.');
        }
        return;
      }

      await dispatch(deleteImageCarousel({ id })).unwrap();
      await dispatch(getCarousel());
      toast.success('Файл успешно удален');
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdateImage = async (id: string, event: FormEvent) => {
    event.preventDefault();
    if (!newImage.image && !newImage.video) {
      toast.warning('Выберите фото или видео!');
      return;
    }
    try {
      await dispatch(updateCarouselImage({ id, updatedImage: newImage })).unwrap();
      setNewImage(emptyState);
      setPreviewUrl(null);
      await dispatch(getCarousel());
      toast.success('Файл успешно обновлен');
    } catch (error) {
      console.error(error);
    }
  };

  return {
    user,
    loadingCarousel,
    newImage,
    setAddModalOpen,
    isAddModalOpen,
    previewUrl,
    handleImageUpload,
    fileInputChangeHandler,
    onDelete,
    onUpdateImage,
  };
};
