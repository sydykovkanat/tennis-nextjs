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
  const currentPage = parseInt(page || '1', 10);
  const pages = generatePages(currentPage, totalPages);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <Pagination>
      <PaginationContent className={cn(className)}>
        <PaginationItem>
          <PaginationPrevious
            className={`${isFirstPage && 'opacity-50 pointer-events-none'}`}
            href={`?page=${Math.max(currentPage - 1, 1)}`}
          />
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
          <PaginationNext
            className={`${isLastPage && 'opacity-50 pointer-events-none'}`}
            href={`?page=${Math.min(currentPage + 1, totalPages)}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
