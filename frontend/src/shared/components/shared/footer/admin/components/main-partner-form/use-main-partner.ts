import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectItemUpdating } from '@/shared/lib/features/footer/footers-slice';
import { getFooterItems, updateMainPartnerImage } from '@/shared/lib/features/footer/footers-thunks';
import { MainPartnerForm } from '@/shared/types/footer.types';
import { toast } from 'sonner';

import React, { type FormEvent, useEffect, useRef, useState } from 'react';

export const useMainPartner = () => {
  const dispatch = useAppDispatch();
  const mainPartnerUpdating = useAppSelector(selectItemUpdating);
  const [mainPartner, setMainPartner] = useState<MainPartnerForm>({
    image: null,
  });
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      setMainPartner({
        image: null,
      });
    }
  }, [open]);

  const onChangeFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;
    setMainPartner((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      if (mainPartner.image !== null) {
        closeRef.current?.click();
        await dispatch(updateMainPartnerImage({ mainPartnerImageLink: mainPartner.image })).unwrap();
        await dispatch(getFooterItems()).unwrap();
        setMainPartner({
          image: null,
        });
        toast.success('Изображение успешно обновлено.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при обновление изображения.');
    }
  };

  return {
    mainPartnerUpdating,
    mainPartner,
    onChangeFileInput,
    handleSubmit,
    open,
    setOpen,
    closeRef,
  };
};
