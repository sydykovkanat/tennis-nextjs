'use client';

import { ActionButtons } from '@/shared/components/shared';
import { useImagesModal } from '@/shared/components/shared/news/hooks/use-images-modal';
import { Button, Carousel, CarouselContent, CarouselItem } from '@/shared/components/ui';
import { API_URL } from '@/shared/constants';
import { cn } from '@/shared/lib';
import { XIcon } from 'lucide-react';
import Image from 'next/image';

import React from 'react';

import styles from './image-modal.module.css';

interface Props {
  images: string[];
  open: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export const ImageModal: React.FC<Props> = ({ images, open, onClose, initialIndex = 0 }) => {
  const { handleClose, handleSetApi } = useImagesModal(initialIndex, onClose);

  return open ? (
    <div className={cn(styles.modal)}>
      <Button onClick={handleClose} className={cn(styles.closeButton)} variant='outline' size='icon'>
        <XIcon />
      </Button>
      <Carousel onClick={(e) => e.stopPropagation()} setApi={handleSetApi}>
        <CarouselContent>
          {images.map((img, i) => (
            <CarouselItem key={i} className={cn(styles.carouselItem)}>
              <Image
                src={API_URL + '/' + img}
                alt={`Image ${i}`}
                className={cn(styles.image)}
                width={1920}
                height={1080}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <ActionButtons />
      </Carousel>
    </div>
  ) : null;
};
