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
import { usePagination } from '@/shared/lib/hooks/usePagination';
import { cn } from '@/shared/lib/utils';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/16/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

import React from 'react';

import styles from './pagination.module.css';

interface Props {
  page: number;
  setPage: (page: number) => void;
  total: number;
}

export const CustomPagination: React.FC<Props> = ({ page, total, setPage }) => {
  const { pageNumbers, disableButton, setPageToFirst, setPageToLast, setPageToPrevious, setPageToNext } = usePagination(
    { page, total, setPage },
  );

  return (
    <Pagination className='py-6'>
      <PaginationContent>
        <PaginationItem className={cn(styles.paginationItem)}>
          <Button
            variant='outline'
            size='icon'
            className='hover:bg-[#64B32C63]'
            style={disableButton(1)}
            onClick={setPageToFirst}
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
            onClick={setPageToPrevious}
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
              onClick={() => setPage(pageNumber)}
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
            onClick={setPageToNext}
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
            onClick={setPageToLast}
          >
            <ChevronDoubleRightIcon />
          </Button>
        </PaginationItem>

        <Select onValueChange={(value) => setPage(Number(value))}>
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
