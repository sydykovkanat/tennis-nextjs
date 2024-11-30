import { getCarousel } from '@/actions/carousel';
import { BlockCarousel } from '@/shared/components/shared';

import React from 'react';

export const Carousel = async () => {
  const carouselFiles = await getCarousel();
  return (
    <>
      <BlockCarousel files={carouselFiles} />
    </>
  );
};
