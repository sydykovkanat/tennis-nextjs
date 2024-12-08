'use client';

import styles from '@/shared/components/shared/carousel/carousel.module.css';
import { CarouselItem } from '@/shared/components/ui/carousel';
import { API_URL } from '@/shared/constants';
import { cn } from '@/shared/lib/helpers/utils';
import Image from 'next/image';

import React from 'react';

interface Props {
  id: string;
  image?: string | null;
  video?: string | null;
  className: string | undefined;
}

export const CarouselItems: React.FC<Props> = ({ id, image, video, className }) => {
  return (
    <>
      <CarouselItem key={id} className={cn(styles.carouselItem, className)}>
        {image ? (
          <Image
            src={API_URL + '/' + image}
            alt={id}
            width={1340}
            height={662}
            className={cn(styles.carouselFile, className)}
            unoptimized
            priority
          />
        ) : video ? (
          <video
            width={1340}
            height={662}
            controls
            src={API_URL + '/' + video}
            className={cn(styles.carouselFile, className)}
          />
        ) : (
          <div className={cn(styles.carouselFile, className)}>No media available</div>
        )}
      </CarouselItem>
    </>
  );
};
