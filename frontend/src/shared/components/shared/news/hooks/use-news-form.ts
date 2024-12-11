'use client';

import {
  selectCreateNewsLoading,
  selectFetchOneNewsLoading,
  selectUpdateNewsLoading,
} from '@/shared/lib/features/news/news-slice';
import { NewsMutation } from '@/shared/types/news.types';

import { useState } from 'react';
import { useAppSelector } from '@/shared/hooks/hooks';

const initialState: NewsMutation = {
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
    const { name, value } = event.target;
    setNews({ ...news, [name]: value });
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
    initialState,
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
