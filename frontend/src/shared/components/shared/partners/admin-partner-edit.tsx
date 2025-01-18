'use client';

import { usePartners } from '@/shared/components/admin/partners/partners-context';
import { AdminPartnerForm } from '@/shared/components/shared';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui';
import { cn } from '@/shared/lib';

import React, { PropsWithChildren, useEffect } from 'react';

interface Props extends PropsWithChildren {
  id: string;
  className?: string;
}

export const AdminPartnerEdit: React.FC<Props> = ({ id, className, children }) => {
  const [open, setOpen] = React.useState(false);
  const { getPartner, partnerFetching, partnerEditing, handleReset, handleEdit } = usePartners();

  const handleClose = () => {
    setOpen(false);
    handleReset();
  };

  const handleSubmit = () => {
    void handleEdit(id);
    handleClose();
  };

  useEffect(() => {
    if (open) {
      void getPartner(id);
    }
  }, [getPartner, id, open]);

  return (
    <div className={cn(className)}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактировать партнера</DialogTitle>
            <DialogDescription className={'pb-3'}>Заполните форму для редактирования партнера</DialogDescription>

            <AdminPartnerForm loading={partnerFetching || partnerEditing} onSubmit={handleSubmit} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
