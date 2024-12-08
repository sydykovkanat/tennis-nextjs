import { cn } from '@/shared/lib';

import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  className?: string;
  title: string;
  description?: string;
}

export const AdminPageHeader: React.FC<Props> = ({ className, title, description, children }) => {
  return (
    <div className={cn('flex items-center justify-between border-b mb-3', className)}>
      <div>
        <h3 className={'text-xl leading-none font-medium'}>{title}</h3>
        {description && <p className={'text-muted-foreground'}>{description}</p>}
      </div>

      {children}
    </div>
  );
};
