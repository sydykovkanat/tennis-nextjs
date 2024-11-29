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
          delay: 4000,
          stopOnInteraction: false,
        }),
      ]}
      className='px-4 lg:px-[50px] mb-5 overflow-hidden'
    >
      <CarouselContent className='rounded-lg'>
        {files.map((file) => (
          <CarouselItem key={file._id} className='overflow-hidden rounded-lg'>
            {file.image ? (
              <Image
                src={API_URL + '/' + file.image}
                alt={file._id}
                width={800}
                height={450}
                className='w-full h-[244px] sm:h-[400px] md:h-[450px] lg:h-[662px] object-cover rounded-lg'
              />
            ) : file.video ? (
              <video
                controls
                src={API_URL + '/' + file.video}
                className='w-full h-[244px] sm:h-[400px] md:h-[450px] lg:h-[662px] object-cover rounded-lg'
              />
            ) : null}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
