'use client';

import { useMemo } from 'react';

interface Props {
  page: number;
  setPage: (page: number) => void;
  total: number;
  maxVisiblePages?: number;
}

export const usePagination = ({ page, total, maxVisiblePages = 3, setPage }: Props) => {
  const pageNumbers = useMemo(() => {
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(total, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }, [page, total, maxVisiblePages]);

  const disableButton = (bound: number): React.CSSProperties => ({
    pointerEvents: page === bound ? 'none' : 'auto',
  });

  return {
    pageNumbers,
    disableButton,
    setPageToFirst: () => setPage(1),
    setPageToLast: () => setPage(total),
    setPageToPrevious: () => setPage(Math.max(1, page - 1)),
    setPageToNext: () => setPage(Math.min(total, page + 1)),
  };
};
