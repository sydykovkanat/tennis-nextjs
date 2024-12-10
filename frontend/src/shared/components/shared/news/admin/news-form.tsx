'use client';

import { Loader, NewsEditor } from '@/shared/components/shared';
import { useNewsForm } from '@/shared/components/shared/news/hooks/use-news-form';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from '@/shared/components/ui';
import { API_URL } from '@/shared/constants';
import { createNews } from '@/shared/lib/features/news/news-thunks';
import { PencilSquareIcon, SquaresPlusIcon } from '@heroicons/react/24/outline';
import { XIcon } from 'lucide-react';
import Image from 'next/image';

import React, { FormEvent } from 'react';
import { useAppDispatch } from '@/shared/hooks/hooks';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newsId?: string;
  isEdit?: boolean;
  classname?: string;
}

export const NewsForm: React.FC<Props> = ({ open, setOpen, newsId, isEdit = false, classname }) => {
  const dispatch = useAppDispatch();
  const {
    news,
    handleChange,
    handleEditorChange,
    handleFileInputChange,
    handleRemoveMedia,
    newsCreating,
    oneNewsFetching,
    newsUpdating,
  } = useNewsForm();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { toast } = await import('sonner');

    if (!news.title.trim() || !news.content.trim() || !news.newsCover) {
      return toast.error('Заполните обязательные поля!');
    }

    try {
      await dispatch(createNews(news)).unwrap();
      toast.success('Новость успешно добавлена!');
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при создании/обновлении новости!');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button size='lg' icon={PencilSquareIcon} />
        ) : (
          <Button className={'w-full xs:w-max'} icon={SquaresPlusIcon}>
            Добавить новость
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='max-h-svh overflow-y-auto max-w-7xl'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>
            {isEdit ? 'Редактировать новость' : 'Добавить новость'}
          </DialogTitle>
          <DialogDescription>Заполните форму перед добавлением</DialogDescription>
        </DialogHeader>

        {oneNewsFetching ? (
          <Loader />
        ) : (
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div className='flex flex-col'>
              <Label htmlFor='title' className='text-lg mb-1'>
                Заголовок новости
              </Label>
              <Input
                required
                name='title'
                placeholder='Заголовок новости'
                autoComplete='off'
                value={news.title}
                onChange={handleChange}
                className='h-12 focus-visible:ring-[#80BC41]'
              />
            </div>

            <div className='flex flex-col'>
              <Input
                name='subtitle'
                placeholder='Подзаголовок новости'
                autoComplete='off'
                value={news.subtitle}
                onChange={handleChange}
                className='h-12 focus-visible:ring-[#80BC41]'
              />
            </div>

            <div className='flex flex-col'>
              <Label className={'text-lg'}>Текст новости</Label>
              <NewsEditor value={news.content} onChange={handleEditorChange} />
            </div>

            <div className='flex flex-col'>
              <Label htmlFor='newsCover' className='text-lg'>
                Обложка новости
              </Label>
              <Input type='file' name='newsCover' onChange={handleFileInputChange} />
              {news.newsCover && (
                <div className='mt-2 relative w-full sm:w-1/3 h-auto'>
                  <Image
                    src={
                      news.newsCover instanceof File
                        ? URL.createObjectURL(news.newsCover)
                        : API_URL + '/' + news.newsCover
                    }
                    alt='News cover preview'
                    className='w-full h-full object-cover max-h-[230px]'
                    width={250}
                    height={250}
                  />
                  <Button
                    className='absolute top-1 right-1 bg-transparent border text-white rounded-md p-2 hover:bg-red-500'
                    icon={XIcon}
                    onClick={() => handleRemoveMedia()}
                  />
                </div>
              )}
            </div>

            <div className='flex flex-col'>
              <Label htmlFor='images' className='text-lg'>
                Изображения новости
              </Label>
              <Input type='file' name='images' onChange={handleFileInputChange} multiple />
              {news.images.length > 0 && (
                <div className='mt-2 flex flex-wrap gap-2'>
                  {news.images.map((image, index) => (
                    <div className='relative h-auto w-full sm:w-[49%] md:w-[19%]' key={index}>
                      <Image
                        src={image instanceof File ? URL.createObjectURL(image) : `${API_URL}/${image}`}
                        alt={`NewsPage Image ${index + 1}`}
                        className='w-full h-full object-cover max-h-[150px]'
                        width={250}
                        height={250}
                      />
                      <Button
                        className='absolute top-1 right-1 bg-transparent border text-white rounded-md p-2 hover:bg-red-500'
                        icon={XIcon}
                        onClick={() => handleRemoveMedia()}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              type='submit'
              className='w-full h-12 bg-[#232A2E] px-10 font-bold'
              disabled={newsCreating || newsUpdating}
            >
              {isEdit ? 'Редактировать' : 'Создать'}
              {(newsCreating || newsUpdating) && <Loader size={'sm'} theme={'light'} />}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
