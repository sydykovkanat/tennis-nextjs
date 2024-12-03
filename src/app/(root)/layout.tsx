import React from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col min-h-dvh'>
      <header className='h-24 mb-16 sm:mb-24 bg-rose-200'></header>
      <main className='grow'>{children}</main>
      <footer className='mt-10 bg-cr-green-300 h-12'></footer>
    </div>
  );
}
