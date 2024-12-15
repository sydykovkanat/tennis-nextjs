'use client';

import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';

import { useEffect } from 'react';

export default function NotFound() {
  const pathName = usePathname();
  useEffect(() => {
    if (pathName !== '/404') {
      redirect('/404');
    }
  }, []);
  return (
    <div className='flex place-content-center h-[100vh] items-center justify-center'>
      <div className='p-8 rounded-lg w-full max-w-5xl'>
        <div className='flex flex-col items-center'>
          <h2 className='mt-6 text-3xl font-bold text-gray-800 dark:text-gray-200'>Страница не найдена</h2>
          <p className='mt-4 text-lg text-gray-600 dark:text-gray-400'>
            Страница, которую вы ищете, не существует или была перемещена
          </p>
        </div>
        <div className='mt-8 flex justify-center space-x-4'>
          <Link
            href={'/'}
            className='inline-flex items-center px-6 py-3 text-base font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-400'
          >
            Вернуться на главную страницу
          </Link>
        </div>
      </div>
    </div>
  );
}
