import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className='max-w-[900px] mx-auto'>{children}</div>;
}
