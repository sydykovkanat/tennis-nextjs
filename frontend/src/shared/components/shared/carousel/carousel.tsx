import { getCarousel } from '@/actions/carousel';
import { BlockCarousel } from '@/shared/components/shared';

import React from 'react';

export const Carousel = async () => {
  try {
    const carouselFiles = await getCarousel();
    return (
      <>
        <BlockCarousel files={carouselFiles} />
      </>
    );
  } catch (error) {
    let errorMessage = 'Неизвестная ошибка';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return (
      <>
        <BlockCarousel files={[]} error={errorMessage} />
      </>
    );
  }
};
