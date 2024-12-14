'use client';

import { useAppSelector } from '@/shared/hooks/hooks';
import {
  selectCreateNewsLoading,
  selectFetchOneNewsLoading,
  selectUpdateNewsLoading,
} from '@/shared/lib/features/news/news-slice';
import { NewsMutation } from '@/shared/types/news.types';

import React, { useState } from 'react';

const initialState: NewsMutation = {
  _id: '',
  title: '',
  subtitle: '',
  content: '',
  newsCover: '',
  images: [],
};

export const useNewsForm = () => {
  const [news, setNews] = useState<NewsMutation>(initialState);
  const [open, setOpen] = useState(false);
  const newsCreating = useAppSelector(selectCreateNewsLoading);
  const oneNewsFetching = useAppSelector(selectFetchOneNewsLoading);
  const newsUpdating = useAppSelector(selectUpdateNewsLoading);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNews((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleEditorChange = (content: string) => {
    setNews({ ...news, content });
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (!files) return;

    setNews((prevState) => {
      if (name === 'images') {
        const updatedImages = Array.from(files);
        return { ...prevState, [name]: [...prevState.images, ...updatedImages] as File[] };
      } else {
        return { ...prevState, [name]: files[0] as File };
      }
    });
  };

  const handleRemoveMedia = (index?: number) => {
    setNews((prevState) => {
      if (index !== undefined) {
        return {
          ...prevState,
          images: prevState.images.filter((_, i) => i !== index) as File[],
        };
      } else {
        return {
          ...prevState,
          newsCover: '',
        };
      }
    });
  };

  const toggleOpen = () => setOpen((prev) => !prev);

  return {
    news,
    setNews,
    open,
    toggleOpen,
    handleChange,
    handleEditorChange,
    handleFileInputChange,
    handleRemoveMedia,
    newsCreating,
    oneNewsFetching,
    newsUpdating,
  };
};
