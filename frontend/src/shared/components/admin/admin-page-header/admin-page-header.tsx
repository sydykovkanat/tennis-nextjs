'use client';

import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { Grid2X2PlusIcon } from 'lucide-react';

import React, { PropsWithChildren } from 'react';

import styles from './admin-header.module.css';

interface Props extends PropsWithChildren {
  className?: string;
  title: string;
  description?: string;
  buttonText?: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AdminPageHeader: React.FC<Props> = ({ className, title, description, buttonText, setOpen, children }) => {
  return (
    <div className={cn(styles.adminPageHeader, className)}>
      <div>
        <h2 className={cn(styles.title)}>{title}</h2>
        {description && <p className={cn(styles.description)}>{description}</p>}
      </div>

      {buttonText && setOpen && (
        <Button className={cn(styles.addButton)} icon={Grid2X2PlusIcon} onClick={() => setOpen(true)}>
          {buttonText}
        </Button>
      )}

      {children}
    </div>
  );
};
