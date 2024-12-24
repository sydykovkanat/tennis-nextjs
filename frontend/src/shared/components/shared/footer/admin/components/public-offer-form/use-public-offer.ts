import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectItemUpdating, selectItemsData } from '@/shared/lib/features/footer/footers-slice';
import { getFooterItems, updatePublicOffer } from '@/shared/lib/features/footer/footers-thunks';
import { toast } from 'sonner';

import React, { type FormEvent, useEffect, useRef, useState } from 'react';

export const usePublicOffer = () => {
  const dispatch = useAppDispatch();
  const publicOfferData = useAppSelector(selectItemsData);
  const publicOfferUpdating = useAppSelector(selectItemUpdating);

  const [publicOffer, setPublicOffer] = useState<string>('');

  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open && publicOfferData) {
      setPublicOffer(publicOfferData[0].publicOffer);
    }
  }, [open, publicOfferData]);

  useEffect(() => {
    if (!open) {
      setPublicOffer('');
    }
  }, [open]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPublicOffer(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      if (publicOffer.trim().length !== 0) {
        closeRef.current?.click();
        await dispatch(updatePublicOffer({ publicOfferLink: publicOffer })).unwrap();
        await dispatch(getFooterItems()).unwrap();
        setPublicOffer('');
        toast.success('Публичная оферта успешно обновлена.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при обновление публичной оферты.');
    }
  };

  return {
    publicOfferUpdating,
    publicOffer,
    open,
    setOpen,
    closeRef,
    inputChangeHandler,
    handleSubmit,
  };
};
