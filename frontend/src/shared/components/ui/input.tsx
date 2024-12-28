import { Label } from '@/shared/components/ui/index';
import { cn } from '@/shared/lib/helpers/utils';

import * as React from 'react';

type InputProps = React.ComponentProps<'input'> & {
  label?: string;
  labelClassName?: string;
  error?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, id, label, labelClassName, error, ...props }, ref) => {
    if (label && !id) {
      throw new Error('Пропс `id` обязателен если передан `label`.');
    }

    return (
      <div className='flex flex-col gap-0.5'>
        {label && (
          <Label
            htmlFor={id}
            className={cn('justify-between flex items-center text-sm font-medium text-foreground', labelClassName)}
          >
            {label}
            <small className={'text-red-600'}>{error}</small>
          </Label>
        )}
        <input
          type={type}
          id={id}
          className={cn(
            'flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            error ? 'border-red-600 focus-visible:border-red-600' : 'border-input focus-visible:border-tn-green',
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
