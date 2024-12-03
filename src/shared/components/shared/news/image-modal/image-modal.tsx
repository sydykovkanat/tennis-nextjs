'use client';

import { useImagesModal } from '@/shared/components/shared/news/hooks/use-images-modal';
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui';
import { API_URL } from '@/shared/constants';
import { XIcon } from 'lucide-react';
import Image from 'next/image';

import React from 'react';

import styles from './image-modal.module.css';
import { cn } from '@/shared/lib';

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
        <CarouselPrevious className={cn(styles.actionButton, 'left-10')} />
        <CarouselNext className={cn(styles.actionButton, 'right-10')} />
      </Carousel>
    </div>
  ) : null;
};
