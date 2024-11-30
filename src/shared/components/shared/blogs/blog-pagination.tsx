import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/components/ui/pagination';
import { cn, generatePages } from '@/shared/lib';

import React from 'react';

interface Props {
  className?: string;
  page: string | null;
  totalPages: number;
}

export const BlogPagination: React.FC<Props> = ({ className, page, totalPages }) => {
  if (!page || totalPages <= 1) {
    return null;
  }
  const currentPage = parseInt(page, 10);
  const pages = generatePages(currentPage, totalPages);

  return (
    <Pagination>
      <PaginationContent className={cn(className)}>
        <PaginationItem>
          <PaginationPrevious href={`?page=${Math.max(currentPage - 1, 1)}`} />
        </PaginationItem>

        {pages.map((item, index) => (
          <PaginationItem key={index}>
            {item === '...' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={currentPage === item}
                href={`?page=${item}`}
                className={cn({ active: currentPage === item })}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext href={`?page=${Math.min(currentPage + 1, totalPages)}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
