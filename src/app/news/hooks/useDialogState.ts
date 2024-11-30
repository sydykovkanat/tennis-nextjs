import { useState } from 'react';

export const useDialogState = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);

  return { open, toggleOpen };
};
