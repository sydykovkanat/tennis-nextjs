import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectMainLogoLoading } from '@/shared/lib/features/footer/footers-slice';
import { createMainLogo, getFooterItems } from '@/shared/lib/features/footer/footers-thunks';
import { MainLogoMutation } from '@/shared/types/footer.types';
import { toast } from 'sonner';

import React, { FormEvent, useState } from 'react';

const emptyState: MainLogoMutation = {
  logo: null,
};

export const useMainLogoForm = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [newLogo, setNewLogo] = useState<MainLogoMutation>(emptyState);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectMainLogoLoading);

  const onChangeFileInputLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;
    setNewLogo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageUpload = async (event: FormEvent) => {
    event.preventDefault();

    if (!newLogo.logo) {
      toast.warning('Выберите логотип!');
      return;
    }
    try {
      await dispatch(createMainLogo(newLogo)).unwrap();
      setNewLogo(emptyState);
      await dispatch(getFooterItems());
      toast.success('Логотип успешно загружен');
      setAddModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('Не удалось загрузить логотип');
    }
  };

  return {
    isAddModalOpen,
    setAddModalOpen,
    onChangeFileInputLogo,
    newLogo,
    handleImageUpload,
    loading,
  };
};
