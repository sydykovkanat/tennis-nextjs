'use client';

import React from 'react';
import { Button, Pagination, PaginationContent, PaginationItem, PaginationLink, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/shared/components/ui';
import { cn, usePagination } from '@/shared/lib';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/16/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import styles from './pagination.module.css';

interface Props {
  total: number;
}

export const CustomPagination: React.FC<Props> = ({ total }) => {
  const router = useRouter();

  const { page, pageNumbers, disableButton, setPageToFirst, setPageToLast, setPageToPrevious, setPageToNext, setPage } =
    usePagination({ total });

  const updatePageInUrl = (pageNumber: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', pageNumber.toString());
    router.push(url.toString());
  };

  return (
    <Pagination className='py-6'>
      <PaginationContent>
        <PaginationItem className={cn(styles.paginationItem)}>
          <Button
            variant='outline'
            size='icon'
            className='hover:bg-[#64B32C63]'
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
            className='hover:bg-[#64B32C63]'
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
          <PaginationItem
            key={pageNumber}
            className={pageNumber !== page ? cn(styles.paginationItem, 'border rounded-lg') : ''}
          >
            <PaginationLink
              isActive={page === pageNumber}
              className={'cursor-pointer hover:bg-[#64B32C63] ' + (page === pageNumber ? 'bg-[#64B32C63]' : '')}
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
            className='hover:bg-[#64B32C63]'
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
            className='hover:bg-[#64B32C63]'
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
