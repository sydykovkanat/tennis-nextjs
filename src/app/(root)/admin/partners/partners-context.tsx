'use client';

import { API_URL } from '@/shared/constants';
import { axiosApi } from '@/shared/lib';
import { Partner, PartnerMutation } from '@/shared/types/partner.types';
import { toast } from 'sonner';

import React, { PropsWithChildren, createContext, useCallback, useContext, useEffect, useState } from 'react';

interface PartnersContextProps {
  partners: Partner[];
  partner: Partner | null;
  getPartner: (id: string) => Promise<void>;
  partnersFetching: boolean;
  partnerFetching: boolean;
  partnerEditing: boolean;
  partnersDeleting: string | null;
  partnerCreating: boolean;
  getPartners: () => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEdit: (id: string) => Promise<void>;
  handleCreate: () => Promise<void>;
  partnerMutation: PartnerMutation;
  handleLogoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFormValid: boolean;
  handleReset: () => void;
  imagePreview: string | null;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PartnersContext = createContext<PartnersContextProps | undefined>(undefined);

const initialPartnerMutation: PartnerMutation = {
  name: '',
  image: null,
  url: '',
};

export const PartnersProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [partnerMutation, setPartnerMutation] = useState<PartnerMutation>(initialPartnerMutation);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [partnersFetching, setPartnersFetching] = useState(false);
  const [partnerFetching, setPartnerFetching] = useState(false);
  const [partnersDeleting, setPartnersDeleting] = useState<string | null>(null);
  const [partnerEditing, setPartnerEditing] = useState(false);
  const [partnerCreating, setPartnerCreating] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const isFormValid = partnerMutation.name !== '' && partnerMutation.url !== '' && partnerMutation.image !== null;

  const getPartners = useCallback(async () => {
    try {
      setPartnersFetching(true);
      const { data: partners } = await axiosApi.get('/partners');
      setPartners(partners);
    } catch (err) {
      console.error(err);
      toast.error('Произошла ошибка при загрузке партнеров');
    } finally {
      setPartnersFetching(false);
    }
  }, []);

  const getPartner = useCallback(async (id: string) => {
    try {
      setPartnerFetching(true);
      const { data: partner } = await axiosApi.get<Partner>(`/partners/${id}`);
      setPartner(partner);
    } catch (err) {
      console.error(err);
      toast.error('Произошла ошибка при загрузке партнеров');
      setPartner(null);
    } finally {
      setPartnerFetching(false);
    }
  }, []);

  useEffect(() => {
    if (partner) {
      setPartnerMutation({
        name: partner.name,
        image: null,
        url: partner.url,
      });
    }
  }, [partner]);

  const handleDelete = async (id: string) => {
    try {
      setPartnersDeleting(id);
      await axiosApi.delete(`/partners/${id}`);
      setPartners((prev) => prev.filter((partner) => partner._id !== id));
      toast.success('Партнер удален');
    } catch (err) {
      console.error(err);
      toast.error('Произошла ошибка при удалении партнера');
    } finally {
      setPartnersDeleting(null);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPartnerMutation((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setPartnerMutation((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleLogoChange(event);

    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      setPartnerEditing(true);
      const formData = new FormData();
      formData.append('name', partnerMutation.name);
      formData.append('url', partnerMutation.url);
      formData.append('image', partnerMutation.image as File);
      const { data } = await axiosApi.put(`/partners/${id}`, formData);
      setPartners((prev) => prev.map((partner) => (partner._id === id ? data : partner)));
      toast.success('Партнер изменен');
    } catch (err) {
      console.error(err);
      toast.error('Произошла ошибка при изменении партнера');
    } finally {
      setPartnerEditing(false);
    }
  };

  useEffect(() => {
    if (partner?.url) {
      setImagePreview(`${API_URL}/${partner.image}`);
    }
  }, [partner]);

  const handleCreate = async () => {
    try {
      setPartnerCreating(true);
      const formData = new FormData();
      formData.append('name', partnerMutation.name);
      formData.append('url', partnerMutation.url);
      formData.append('image', partnerMutation.image as File);
      const { data } = await axiosApi.post('/partners', formData);
      setPartners((prev) => [...prev, data]);
      toast.success('Партнер создан');
    } catch (err) {
      console.error(err);
      toast.error('Произошла ошибка при создании партнера');
    } finally {
      setPartnerCreating(false);
    }
  };

  const handleReset = () => {
    setPartnerMutation(initialPartnerMutation);
    setImagePreview(null);
  };

  return (
    <PartnersContext.Provider
      value={{
        partners,
        partner,
        partnersFetching,
        partnersDeleting,
        getPartners,
        handleDelete,
        partnerEditing,
        handleChange,
        handleEdit,
        handleCreate,
        partnerMutation,
        handleLogoChange,
        getPartner,
        partnerFetching,
        isFormValid,
        partnerCreating,
        handleReset,
        handleImageChange,
        imagePreview,
      }}
    >
      {children}
    </PartnersContext.Provider>
  );
};

export const usePartners = (): PartnersContextProps => {
  const context = useContext(PartnersContext);
  if (!context) {
    throw new Error('usePartners должен использоваться внутри PartnersProvider');
  }
  return context;
};
