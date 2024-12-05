'use client';

import { useAdminCarousel } from '@/shared/components/shared/carousel/admin/hooks/use-admin-carousel';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { PaperAirplaneIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

import React from 'react';

import styles from './dialog-in-carousel-item-for-change-file.module.css';

interface DialogInCarouselItemForChangeFileProps {
  id: string;
  className?: string;
}

export const DialogInCarouselItemForChangeFile: React.FC<DialogInCarouselItemForChangeFileProps> = ({
  id,
  className,
}) => {
  const { newImage, fileInputChangeHandler, onUpdateImage, previewUrl } = useAdminCarousel();

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button data-test-id='change-file-in-carousel'>
            <PencilSquareIcon />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Обновить файл</DialogTitle>
            <DialogDescription>Заполните форму перед добавлением.</DialogDescription>
            <form onSubmit={(e) => onUpdateImage(id, e)} className='flex items-center space-x-2'>
              <Input
                className='w-full sm:w-[250px]'
                id='image'
                type='file'
                name='image'
                onChange={fileInputChangeHandler}
              />
              <Button type='submit' className={cn(styles.bntAddFile, className)} data-test-id='update-file-in-carousel'>
                Добавить файл
                <PaperAirplaneIcon />
              </Button>
            </form>
            {previewUrl && (
              <div className={cn(styles.filePreviews, className)}>
                {newImage.image ? (
                  <img src={previewUrl} alt='Preview' className={cn(styles.image, className)} />
                ) : (
                  <video controls src={previewUrl} className={cn(styles.video, className)} />
                )}
              </div>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
