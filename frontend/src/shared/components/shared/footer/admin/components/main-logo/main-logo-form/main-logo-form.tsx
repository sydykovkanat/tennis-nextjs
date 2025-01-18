'use client';

import { Loader } from '@/shared/components/shared';
import { useMainLogoForm } from '@/shared/components/shared/footer/admin/components/main-logo/main-logo-form/use-main-logo-form';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { Grid2X2PlusIcon } from 'lucide-react';

import React from 'react';

import styles from './main-logo.module.css';

interface AdminMainLogoDialogProps {
  className?: string;
}

export const MainLogoForm: React.FC<AdminMainLogoDialogProps> = (className) => {
  const { isAddModalOpen, setAddModalOpen, handleImageUpload, onChangeFileInputLogo, loading } = useMainLogoForm();
  return (
    <>
      <Dialog open={isAddModalOpen} onOpenChange={setAddModalOpen}>
        <DialogTrigger asChild>
          <Button className={cn(className)} onClick={() => setAddModalOpen(true)}>
            Добавить логотип
            <Grid2X2PlusIcon />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle> Добавить логотип </DialogTitle>
            <DialogDescription>Заполните форму перед добавлением</DialogDescription>
            <form onSubmit={(e) => handleImageUpload(e)} className={cn(styles.form)}>
              <div className={cn(styles.input)}>
                <Input id='logo' type='file' name='logo' onChange={onChangeFileInputLogo} accept='image/*' />
              </div>

              {loading ? (
                <Loader />
              ) : (
                <Button type='submit' className={cn(styles.btnAddDialog)} data-test-id='add-logo-header'>
                  Добавить логотип
                  <PaperAirplaneIcon />
                </Button>
              )}
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
