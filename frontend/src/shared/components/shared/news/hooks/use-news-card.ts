'use client';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectRemoveNewsLoading } from '@/shared/lib/features/news/news-slice';
import { removeNews } from '@/shared/lib/features/news/news-thunks';

export const useNewsCard = (id: string) => {
  const dispatch = useAppDispatch();
  const newsRemoving = useAppSelector(selectRemoveNewsLoading);

  const handleRemove = async () => {
    try {
      const { toast } = await import('sonner');
      await dispatch(removeNews(id)).unwrap();
      toast.success('Новость успешно удалена!');
    } catch (e) {
      const { toast } = await import('sonner');
      console.error(e);
      toast.error('Что-то пошло не так, попробуйте еще раз.');
    }
  };

  return {
    newsRemoving,
    handleRemove,
  };
};
