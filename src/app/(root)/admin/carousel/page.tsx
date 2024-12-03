'use client';

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

import React from 'react';

export default function CarouselPage() {
  return (
    <>
      <div className='flex justify-center flex-col'>
        <header className='flex mb-4 xs:items-center justify-between gap-2 flex-col xs:flex-row border-b pb-1.5'>
          <div>
            <h1 className='text-2xl font-medium leading-none'>Карусель</h1>
            <small className='text-muted-foreground text-base'>Управление фотографиями главной карусели</small>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className={'w-full xs:w-max'}>Добавить файл</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Добавить файл</DialogTitle>
                <DialogDescription>Заполните форму перед добавлением.</DialogDescription>
                <form className='flex items-center space-x-2'>
                  <Input className='w-[250px] md:w-full' id='image' type='file' name='image' />
                  <Button type='submit' className='mt-0' data-test-id={'add-file-in-carousel'}></Button>
                </form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </header>
      </div>
    </>
  );
}
