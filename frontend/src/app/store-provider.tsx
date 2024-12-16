'use client';

import { addTokenInterceptors } from '@/shared/lib/helpers/axios-api';
import { store } from '@/shared/lib/store';
import { useRouter } from 'next/navigation';
import { persistStore } from 'redux-persist';

import React from 'react';
import { Provider } from 'react-redux';

persistStore(store);

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  addTokenInterceptors(store, router);

  return <Provider store={store}>{children}</Provider>;
}
