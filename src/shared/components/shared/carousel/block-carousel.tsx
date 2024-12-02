'use client';

import { CarouselItems } from '@/shared/components/shared/carousel/carousel-item';
import { Carousel, CarouselContent } from '@/shared/components/ui/carousel';
import { cn } from '@/shared/lib/helpers/utils';
import { CarouselTypes } from '@/shared/types/carousel.types';
import Autoplay from 'embla-carousel-autoplay';

import React, { type PropsWithChildren } from 'react';

import styles from './carousel.module.css';

interface Props extends PropsWithChildren {
  className?: string;
  files: CarouselTypes[];
}

export const BlockCarousel: React.FC<Props> = ({ className, files }) => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 6000,
          stopOnInteraction: false,
        }),
      ]}
      className={cn(styles.carouselContainer, className)}
    >
      <CarouselContent className={cn(styles.carouselContent, className)}>
        {files.map((file) => (
          <CarouselItems key={file._id} id={file._id} image={file.image} video={file?.video} className={className} />
        ))}
      </CarouselContent>
    </Carousel>
  );
};
