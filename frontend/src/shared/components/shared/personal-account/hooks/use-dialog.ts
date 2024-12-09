import { useRef, useState } from 'react';

export const useDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const closeDialog = () => {
    closeRef.current?.click();
  };

  return { isDialogOpen, setIsDialogOpen, closeRef, closeDialog };
};
