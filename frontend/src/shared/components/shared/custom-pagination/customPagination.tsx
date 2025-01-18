'use client';

import {
  Button,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '@/shared/components/ui';
import { cn, usePagination } from '@/shared/lib';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/16/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

import React from 'react';

import styles from './pagination.module.css';

interface Props {
  total: number;
  setPageUser?: (page: number) => void;
}

export const CustomPagination: React.FC<Props> = ({ total, setPageUser }) => {
  const router = useRouter();

  const { page, pageNumbers, disableButton, setPageToFirst, setPageToLast, setPageToPrevious, setPageToNext, setPage } =
    usePagination({ total });

  const updatePageInUrl = (pageNumber: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', pageNumber.toString());
    router.push(url.toString());
    if (setPageUser) {
      setPageUser(pageNumber);
    }
  };

  return (
    <Pagination className={styles.pagination}>
      <PaginationContent>
        <PaginationItem className={cn(styles.paginationItem)}>
          <Button
            variant='outline'
            size='icon'
            className={styles.paginationButton}
            style={disableButton(1)}
            onClick={() => {
              setPageToFirst();
              updatePageInUrl(1);
            }}
          >
            <ChevronDoubleLeftIcon />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            variant='outline'
            size='icon'
            className={styles.paginationButton}
            style={disableButton(1)}
            onClick={() => {
              setPageToPrevious();
              updatePageInUrl(page - 1);
            }}
          >
            <ChevronLeftIcon />
          </Button>
        </PaginationItem>

        {pageNumbers.map((pageNumber) => (
          <PaginationItem key={pageNumber} className={pageNumber !== page ? cn(styles.paginationItem) : ''}>
            <PaginationLink
              isActive={page === pageNumber}
              className={
                'cursor-pointer hover:bg-tn-green-secondary ' + (page === pageNumber ? 'bg-tn-green-secondary' : '')
              }
              onClick={() => {
                setPage(pageNumber);
                updatePageInUrl(pageNumber);
              }}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <Button
            variant='outline'
            size='icon'
            className={styles.paginationButton}
            style={disableButton(total)}
            onClick={() => {
              setPageToNext();
              updatePageInUrl(page + 1);
            }}
          >
            <ChevronRightIcon />
          </Button>
        </PaginationItem>
        <PaginationItem className={cn(styles.paginationItem)}>
          <Button
            variant='outline'
            size='icon'
            className={styles.paginationButton}
            style={disableButton(total)}
            onClick={() => {
              setPageToLast();
              updatePageInUrl(total);
            }}
          >
            <ChevronDoubleRightIcon />
          </Button>
        </PaginationItem>

        <Select
          onValueChange={(value) => {
            setPage(Number(value));
            updatePageInUrl(parseInt(value));
          }}
        >
          <SelectTrigger className={cn(styles.selectTrigger)} />
          <SelectContent>
            <SelectGroup>
              {Array.from({ length: total }, (_, i) => i + 1).map((pageNum) => (
                <SelectItem key={pageNum} value={pageNum.toString()}>
                  {pageNum}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </PaginationContent>
    </Pagination>
  );
};
