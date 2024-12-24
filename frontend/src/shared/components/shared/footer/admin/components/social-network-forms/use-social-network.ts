import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import {
  selectItemCreating,
  selectItemUpdating,
  selectItemsData,
  selectOneSocialLink,
} from '@/shared/lib/features/footer/footers-slice';
import { createSocialNetwork, getFooterItems, updateSocialNetwork } from '@/shared/lib/features/footer/footers-thunks';
import { LinkDataMutation } from '@/shared/types/footer.types';
import { toast } from 'sonner';

import React, { type FormEvent, useEffect, useRef, useState } from 'react';

export const useSocialNetwork = (id?: string) => {
  const dispatch = useAppDispatch();
  const socialNetworkData = useAppSelector(selectItemsData);
  const socialNetworkCreating = useAppSelector(selectItemCreating);
  const socialOneNetworkData = useAppSelector(selectOneSocialLink);
  const socialNetworkUpdating = useAppSelector(selectItemUpdating);

  const [socialNetwork, setSocialNetwork] = useState<LinkDataMutation>({
    name: '',
    value: '',
  });

  const validateForm = socialNetwork.name.trim().length !== 0 && socialNetwork.value.trim().length !== 0;
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const blockedSocial = socialNetworkData?.[0]?.socialNetwork?.map((item) => item.name.toLowerCase()) ?? [];
  const isBlocked = blockedSocial.includes(socialNetwork.name.toLowerCase());

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSocialNetwork((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!open) {
      setSocialNetwork({
        name: '',
        value: '',
      });
    }
  }, [open, setSocialNetwork]);

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      if ((!id && validateForm && !isBlocked) || (id && validateForm)) {
        closeRef.current?.click();

        if (id) {
          await dispatch(updateSocialNetwork({ id, data: socialNetwork })).unwrap();
        } else {
          await dispatch(createSocialNetwork(socialNetwork)).unwrap();
        }
        await dispatch(getFooterItems()).unwrap();
        setSocialNetwork({
          name: '',
          value: '',
        });
        toast.success(id ? 'Социальная сеть успешно обновлена.' : 'Социальная сеть успешно добавлена.');
      }
    } catch (error) {
      console.error(error);
      toast.error(id ? 'Ошибка при обновлении социальной сети.' : 'Ошибка при добавлении социальной сети.');
    }
  };

  return {
    dispatch,
    socialNetworkData,
    socialNetworkCreating,
    socialNetwork,
    setSocialNetwork,
    open,
    setOpen,
    closeRef,
    isBlocked,
    inputChangeHandler,
    socialOneNetworkData,
    socialNetworkUpdating,
    handleSubmit,
  };
};
