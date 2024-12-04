'use client';

import { Loader, Title } from '@/shared/components/shared';
import { Confirm } from '@/shared/components/shared/confirm/confirm';
import { Input } from '@/shared/components/ui';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import { API_URL } from '@/shared/constants';
import { cn } from '@/shared/lib';
import { PaperAirplaneIcon, PencilSquareIcon, SquaresPlusIcon, TrashIcon } from '@heroicons/react/24/outline';

import React, { PropsWithChildren } from 'react';

import styles from './admin-carousel.module.css';
import { useAdminCarousel } from './hooks/use-admin-carousel';

interface Props extends PropsWithChildren {
  className?: string;
}

export const CarouselPage: React.FC<Props> = ({ className }) => {
  const {
    user,
    carousel,
    loadingCarousel,
    newImage,
    setAddModalOpen,
    handleImageUpload,
    fileInputChangeHandler,
    onDelete,
    onUpdateImage,
    isAddModalOpen,
    previewUrl,
  } = useAdminCarousel();

  return (
    <>
      <div className={cn(styles.containerForHeader, className)}>
        <header className={cn(styles.header, className)}>
          <div>
            <Title variant={'h1'} className={cn(styles.mainText, className)}>
              Карусель
            </Title>
            <small className={cn(styles.subText, className)}>Управление фотографиями главной карусели</small>
          </div>
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
                    className='w-[250px] md:w-full'
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
                  <div className='border rounded-lg mt-2 mb-2 p-5 bg-muted'>
                    {newImage.image ? (
                      <img src={previewUrl} alt='Preview' className='w-auto h-40 rounded-lg mx-auto object-contain' />
                    ) : (
                      <video controls src={previewUrl} className='w-auto h-40 rounded-lg mx-auto' />
                    )}
                  </div>
                )}
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </header>
      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
        {loadingCarousel ? (
          <div>
            <Loader />
          </div>
        ) : (
          carousel.map((image) => (
            <div key={image._id} className='relative'>
              {image.image ? (
                <img
                  src={API_URL + '/' + image.image}
                  alt={image._id}
                  className='rounded-lg object-cover h-full w-full max-h-[300px]'
                />
              ) : image.video ? (
                <video
                  controls
                  src={API_URL + '/' + image.video}
                  className='rounded-lg object-cover h-full w-full max-h-[300px]'
                />
              ) : null}
              {user && user.role === 'admin' && (
                <div className='top-3 left-6 absolute'>
                  <Confirm onOk={() => onDelete(image._id)}>
                    <Button className='me-3' data-test-id='delete-file-in-carousel'>
                      <TrashIcon />
                    </Button>
                  </Confirm>
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
                        <form onSubmit={(e) => onUpdateImage(image._id, e)} className='flex items-center space-x-2'>
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
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
};
