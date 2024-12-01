'use client';

import { useMemo, useState } from 'react';

interface Props {
  total: number;
  maxVisiblePages?: number;
}

export const usePagination = ({ total, maxVisiblePages = 3 }: Props) => {
  const [page, setPage] = useState(1);

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
    page,
    setPage,
    setPageToFirst: () => setPage(1),
    setPageToLast: () => setPage(total),
    setPageToPrevious: () => setPage(Math.max(1, page - 1)),
    setPageToNext: () => setPage(Math.min(total, page + 1)),
  };
};
