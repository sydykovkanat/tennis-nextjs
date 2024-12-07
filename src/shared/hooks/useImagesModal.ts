'use client';

import { CarouselApi } from '@/shared/components/ui';

import { useEffect, useRef, useState } from 'react';

export const useImagesModal = (index: number, onClose: () => void) => {
  const carouselApi = useRef<CarouselApi | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (carouselApi.current && isInitialized) {
      carouselApi.current.scrollTo(index);
    }
  }, [index, isInitialized]);

  const handleSetApi = (api: CarouselApi) => {
    carouselApi.current = api;
    setIsInitialized(true);
  };

  const handleClose = () => {
    setIsInitialized(false);
    onClose();
  };

  return { handleSetApi, handleClose };
};
