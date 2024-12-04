'use client';

import { useAdminCarousel } from '@/shared/components/shared/carousel/admin/hooks/use-admin-carousel';
import { Button, Input } from '@/shared/components/ui';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import { PaperAirplaneIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

import React from 'react';

interface DialogInCarouselItemForChangeFileProps {
  id: string;
}

export const DialogInCarouselItemForChangeFile: React.FC<DialogInCarouselItemForChangeFileProps> = ({ id }) => {
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
              <Button type='submit' className='w-full sm:w-auto' data-test-id='update-file-in-carousel'>
                Добавить файл
                <PaperAirplaneIcon />
              </Button>
            </form>
            {previewUrl && (
              <div className='border rounded-lg mt-2 mb-2 p-5 bg-muted'>
                {newImage.image ? (
                  <img src={previewUrl} alt='Preview' className='w-auto h-40 rounded-lg mx-auto' />
                ) : (
                  <video controls src={previewUrl} className='w-auto h-40 rounded-lg mx-auto' />
                )}
              </div>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
