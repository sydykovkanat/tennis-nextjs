import { usePartners } from '@/shared/components/admin/partners/partners-context';
import { Button, Input } from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { Save } from 'lucide-react';

import React from 'react';

import styles from './admin-partner-form.module.css';

interface Props {
  loading: boolean;
  className?: string;
  onSubmit: () => void;
}

export const AdminPartnerForm: React.FC<Props> = ({ className, onSubmit }) => {
  const { handleChange, partnerMutation, isFormValid, imagePreview, handleImageChange, partnerCreating } =
    usePartners();

  const onEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={onEdit} className={cn(className)}>
      <div className={styles.inputs}>
        <Input
          id={'name'}
          placeholder={'Введите название партнера'}
          value={partnerMutation.name}
          onChange={handleChange}
          label={'Название'}
        />
        <Input
          type={'url'}
          placeholder={'Введите адрес ссылки на партнера'}
          id={'url'}
          value={partnerMutation.url}
          onChange={handleChange}
          label={'Ссылка'}
        />
        <Input type={'file'} id={'image'} onChange={handleImageChange} label={'Логотип'} accept={'image/*'} />
      </div>

      {imagePreview && (
        <div className={styles.previewImageBlock}>
          <img src={imagePreview} alt='Превью логотипа' className={styles.previewImage} />
        </div>
      )}

      <Button
        disabled={!isFormValid || partnerCreating}
        loading={partnerCreating}
        icon={Save}
        className={styles.btn}
        size={'lg'}
      >
        Сохранить
      </Button>
    </form>
  );
};
