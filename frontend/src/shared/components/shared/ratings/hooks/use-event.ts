import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { selectCategories, selectCategoriesFetching } from '@/shared/lib/features/categories/category-slice';
import { fetchCategories } from '@/shared/lib/features/categories/category-thunks';
import { selectEventFetching } from '@/shared/lib/features/rating/rating-slice';
import { Event, EventMutation } from '@/shared/types/event.types';

import React from 'react';

interface UseEventProps {
  event?: Event;
  onSubmit: (eventMutation: EventMutation) => void;
}

const initialState: EventMutation = {
  rating: '',
  category: '',
  link: '',
};

export const useEvent = ({ event, onSubmit }: UseEventProps) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const categoriesFetching = useAppSelector(selectCategoriesFetching);
  const eventFetching = useAppSelector(selectEventFetching);

  const [eventMutation, setEventMutation] = React.useState<EventMutation>(initialState);

  React.useEffect(() => {
    if (event) {
      setEventMutation({
        rating: event.rating._id,
        category: event.category._id,
        link: event.link,
      });
    } else {
      setEventMutation(initialState);
    }
  }, [event]);

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setEventMutation((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string, id: string) => {
    setEventMutation((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(eventMutation);
    setEventMutation(initialState);
  };

  const isFormValid = Boolean(eventMutation.rating && eventMutation.category && eventMutation.link);

  return {
    eventMutation,
    categories,
    categoriesFetching,
    eventFetching,
    handleChange,
    handleSelectChange,
    handleSubmit,
    isFormValid,
  };
};
