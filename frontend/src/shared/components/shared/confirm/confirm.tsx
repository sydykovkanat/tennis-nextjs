import { Button } from '@/shared/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { cn } from '@/shared/lib';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { PopoverClose } from '@radix-ui/react-popover';
import { Trash } from 'lucide-react';

import React, { PropsWithChildren } from 'react';

import styles from './confirm.module.css';

interface Props extends PropsWithChildren {
  text?: string;
  onOk?: () => void;
  onCancel?: () => void;
  onOkText?: string;
  onCancelText?: string;
  onOkIcon?: React.ReactNode;
}

export const Confirm: React.FC<Props> = ({
  text = 'Вы действительно хотите?',
  onOk,
  onCancel,
  onOkText = 'Удалить',
  onCancelText = 'Отменить',
  onOkIcon = <Trash strokeWidth={1.2} />,
  children,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
        {children}
      </PopoverTrigger>
      <PopoverContent
        onClick={(e) => e.stopPropagation()}
        className={cn(styles.confirmPopoverContent, 'dark:bg-gray-900')}
      >
        <small className={styles.confirmText}>{text}</small>
        <div className={styles.confirmPopoverContainer}>
          <PopoverClose asChild>
            <Button onClick={onCancel} size={'sm'} variant={'outline'} className={styles.confirmButton}>
              {onCancelText}
              <XMarkIcon />
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button onClick={onOk} size={'sm'} className={styles.confirmButton}>
              {onOkText} {onOkIcon}
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};
