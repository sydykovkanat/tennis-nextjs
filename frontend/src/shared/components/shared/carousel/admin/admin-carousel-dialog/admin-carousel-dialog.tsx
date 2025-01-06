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
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { Grid2X2PlusIcon, Pencil } from 'lucide-react';

import React from 'react';

import styles from './admin-carousel-dialog.module.css';

interface AdminCarouselDialogProps {
  className?: string;
  id?: string;
  mode: 'add' | 'edit';
}

export const AdminCarouselDialog: React.FC<AdminCarouselDialogProps> = ({ className, id, mode }) => {
  const isAddMode = mode === 'add';
  const {
    newImage,
    isAddModalOpen,
    setAddModalOpen,
    handleImageUpload,
    onUpdateImage,
    fileInputChangeHandler,
    previewUrl,
  } = useAdminCarousel();
  return (
    <>
      <Dialog open={isAddMode ? isAddModalOpen : undefined} onOpenChange={isAddMode ? setAddModalOpen : undefined}>
        <DialogTrigger asChild>
          <Button
            className={cn(className, isAddMode ? styles.btnAddFile : undefined)}
            data-test-id={isAddMode ? '' : 'change-file-in-carousel'}
            onClick={isAddMode ? () => setAddModalOpen(true) : undefined}
          >
            {isAddMode ? (
              <>
                Добавить файл
                <Grid2X2PlusIcon />
              </>
            ) : (
              <Pencil />
            )}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> {isAddMode ? 'Добавить файл' : 'Добавить файл'} </DialogTitle>
            <DialogDescription className={styles.dialogDescription}>
              Заполните форму перед добавлением
            </DialogDescription>
            <form
              onSubmit={(e) => (isAddMode ? handleImageUpload(e) : id && onUpdateImage(id, e))}
              className={cn(styles.form)}
            >
              <Input
                className={cn(styles.input)}
                id='image'
                type='file'
                name='image'
                onChange={fileInputChangeHandler}
                accept='image/*, video/*'
              />
              <Button
                type='submit'
                className='mt-0'
                data-test-id={isAddMode ? 'add-file-in-carousel' : 'update-file-in-carousel'}
              >
                {isAddMode ? 'Добавить файл' : 'Обновить'}
                <PaperAirplaneIcon />
              </Button>
            </form>
            {previewUrl && (
              <div className={cn(styles.filePreviews, 'dark:bg-gray-700')}>
                {newImage.image ? (
                  <img src={previewUrl} alt='Preview' className={cn(styles.image)} />
                ) : (
                  <video controls src={previewUrl} className={cn(styles.video)} />
                )}
              </div>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
