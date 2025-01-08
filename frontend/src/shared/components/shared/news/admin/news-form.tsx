'use client';

import { Confirm, Loader, NewsEditor } from '@/shared/components/shared';
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
import { cn, useAppDispatch, useAppSelector } from '@/shared/lib';
import { selectOneNews } from '@/shared/lib/features/news/news-slice';
import { createNews, fetchOneNews, updateNews } from '@/shared/lib/features/news/news-thunks';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import React, { FormEvent, useEffect } from 'react';

import styles from './news-form.module.css';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newsId?: string;
  isEdit?: boolean;
  classname?: string;
}

export const NewsForm: React.FC<Props> = ({ open, setOpen, newsId, isEdit = false, classname }) => {
  const {
    news,
    setNews,
    handleChange,
    handleEditorChange,
    handleFileInputChange,
    handleRemoveMedia,
    newsCreating,
    oneNewsFetching,
    newsUpdating,
  } = useNewsForm();
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectOneNews);
  const router = useRouter();

  useEffect(() => {
    if (newsId) {
      dispatch(fetchOneNews(newsId)).unwrap();
    }
  }, [newsId, dispatch]);

  useEffect(() => {
    if (data && newsId) {
      setNews(data);
    }
  }, [newsId, data, setNews]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { toast } = await import('sonner');

    if (!news.title.trim() || !news.content.trim() || !news.newsCover) {
      return toast.error('Заполните обязательные поля!');
    }

    try {
      if (isEdit && newsId) {
        await dispatch(updateNews({ newsId, newsMutation: news })).unwrap();
        toast.success('Новость успешно обновлена!');
        router.refresh();
      } else {
        await dispatch(createNews(news)).unwrap();
        toast.success('Новость успешно добавлена!');
        router.refresh();
      }

      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при создании/обновлении новости!');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild />
      <DialogContent className={cn(styles.content, 'dark:bg-[#1F2937]')}>
        <DialogHeader>
          <DialogTitle className={cn(styles.title)}>
            {isEdit ? 'Редактировать новость' : 'Добавить новость'}
          </DialogTitle>
          <DialogDescription>Заполните форму перед добавлением</DialogDescription>
        </DialogHeader>

        {oneNewsFetching ? (
          <Loader />
        ) : (
          <form className={cn(styles.form, classname)} onSubmit={handleSubmit}>
            <div className={cn(styles.inputBlock)}>
              <Label htmlFor='title' className={cn(styles.label)}>
                Заголовок новости
              </Label>
              <Input
                required
                name='title'
                placeholder='Заголовок новости'
                autoComplete='off'
                value={news.title}
                onChange={handleChange}
                className={cn(styles.input)}
              />
            </div>

            <div className={cn(styles.inputBlock)}>
              <Input
                name='subtitle'
                placeholder='Подзаголовок новости'
                autoComplete='off'
                value={news.subtitle}
                onChange={handleChange}
                className={cn(styles.input)}
              />
            </div>

            <div className={cn(styles.inputBlock)}>
              <Label className={'text-lg'}>Текст новости</Label>
              <NewsEditor value={news.content} onChange={handleEditorChange} />
            </div>

            <div className={cn(styles.inputBlock)}>
              <Label htmlFor='newsCover' className={cn(styles.label)}>
                Обложка новости
              </Label>
              <Input required={!isEdit} type='file' name='newsCover' onChange={handleFileInputChange} />
              {news.newsCover && (
                <div className={cn(styles.newsCoverBlock)}>
                  <img
                    src={
                      news.newsCover instanceof File
                        ? URL.createObjectURL(news.newsCover)
                        : API_URL + '/' + news.newsCover
                    }
                    alt='News cover preview'
                    className={cn(styles.mediaInForm, 'max-h-[230px]')}
                  />
                  <Confirm onOk={() => handleRemoveMedia()}>
                    <Button type='button' className={cn(styles.removeMediaButton)} icon={XIcon} />
                  </Confirm>
                </div>
              )}
            </div>

            <div className={cn(styles.inputBlock)}>
              <Label htmlFor='images' className={cn(styles.label)}>
                Изображения новости
              </Label>
              <Input type='file' name='images' onChange={handleFileInputChange} multiple />
              {news.images.length > 0 && (
                <div className={cn(styles.imagesBlock)}>
                  {news.images.map((image, index) => (
                    <div className={cn(styles.images)} key={index}>
                      <img
                        src={image instanceof File ? URL.createObjectURL(image) : `${API_URL}/${image}`}
                        alt={`NewsPage Image ${index + 1}`}
                        className={cn(styles.mediaInForm, 'max-h-[150px]')}
                      />
                      <Confirm onOk={() => handleRemoveMedia(index)}>
                        <Button type='button' className={cn(styles.removeMediaButton)} icon={XIcon} />
                      </Confirm>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button type='submit' className={cn(styles.submitButton)} disabled={newsCreating || newsUpdating}>
              {isEdit ? 'Редактировать' : 'Создать'}
              {(newsCreating || newsUpdating) && <Loader size={'sm'} theme={'light'} />}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
