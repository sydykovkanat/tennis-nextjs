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

import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  className?: string;
}

export const AdminPartnerCreate: React.FC<Props> = ({ className, children }) => {
  const [open, setOpen] = React.useState(false);
  const { handleReset, partnerCreating, handleCreate } = usePartners();

  const handleClose = (value?: boolean) => {
    if (value !== undefined) {
      setOpen(value);
    }
    handleReset();
  };

  const handleSubmit = async () => {
    await handleCreate();
    handleClose(false);
  };

  return (
    <div className={cn(className)}>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className='dark:bg-[#1F2937]'>
          <DialogHeader>
            <DialogTitle>Добавить партнера</DialogTitle>
            <DialogDescription>Заполните форму для добавления партнера</DialogDescription>

            <AdminPartnerForm loading={partnerCreating} onSubmit={handleSubmit} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
