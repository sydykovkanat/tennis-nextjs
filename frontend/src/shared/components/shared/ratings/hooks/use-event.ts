import { useAppSelector } from '@/shared/lib';
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
  rank: '',
  link: '',
};

export const useEvent = ({ event, onSubmit }: UseEventProps) => {
  const eventFetching = useAppSelector(selectEventFetching);

  const [eventMutation, setEventMutation] = React.useState<EventMutation>(initialState);

  React.useEffect(() => {
    if (event) {
      setEventMutation({
        rating: event.rating._id,
        category: event.category,
        rank: event.rank,
        link: event.link,
      });
    } else {
      setEventMutation(initialState);
    }
  }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setEventMutation((prev) => ({ ...prev, [id]: value.trim() }));
  };

  const handleSelectChange = (value: string, id: string) => {
    setEventMutation((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(eventMutation);
    setEventMutation(initialState);
  };

  const isFormValid = Boolean(
    eventMutation.rating && eventMutation.category && eventMutation.link && eventMutation.rank,
  );

  return {
    eventMutation,
    eventFetching,
    handleChange,
    handleSelectChange,
    handleSubmit,
    isFormValid,
  };
};
