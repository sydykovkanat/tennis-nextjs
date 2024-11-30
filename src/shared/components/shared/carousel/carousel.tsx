'use client';

import { Carousel, CarouselContent, CarouselItem } from '@/shared/components/ui/carousel';
import { API_URL } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';
import { CarouselTypes } from '@/shared/types/carousel.types';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

import React, { type PropsWithChildren } from 'react';

import styles from './carousel.module.css';

interface Props extends PropsWithChildren {
  className?: string;
  files: CarouselTypes[];
}

export const BlockCarousel: React.FC<Props> = async ({ className, files }) => {
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
          <CarouselItem key={file._id} className={cn(styles.carouselItem, className)}>
            {file.image ? (
              <Image
                src={API_URL + '/' + file.image}
                alt={file._id}
                width={1340}
                height={662}
                className={cn(styles.carouselFile, className)}
                unoptimized
              />
            ) : file.video ? (
              <video controls src={API_URL + '/' + file.video} className={cn(styles.carouselFile, className)} />
            ) : null}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
