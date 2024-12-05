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
import { PaperAirplaneIcon, SquaresPlusIcon } from '@heroicons/react/24/outline';

import React from 'react';

import styles from './dialog-in-header-for-admin-carousel.module.css';

interface CarouselFromProps {
  className?: string;
}

export const DialogInHeaderForAdminCarousel: React.FC<CarouselFromProps> = ({ className }) => {
  const { newImage, setAddModalOpen, handleImageUpload, fileInputChangeHandler, isAddModalOpen, previewUrl } =
    useAdminCarousel();
  return (
    <>
      <Dialog open={isAddModalOpen} onOpenChange={setAddModalOpen}>
        <DialogTrigger asChild>
          <Button className={cn(styles.btnAddFile, className)} onClick={() => setAddModalOpen(true)}>
            Добавить файл
            <SquaresPlusIcon />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить файл</DialogTitle>
            <DialogDescription>Заполните форму перед добавлением.</DialogDescription>
            <form onSubmit={(e) => handleImageUpload(e)} className='flex items-center space-x-2'>
              <Input
                className={cn(styles.input, className)}
                id='image'
                type='file'
                name='image'
                onChange={fileInputChangeHandler}
              />
              <Button type='submit' className='mt-0' data-test-id={'add-file-in-carousel'}>
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
