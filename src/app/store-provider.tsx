'use client';

import { store } from '@/shared/lib/store';
import { persistStore } from 'redux-persist';

import React from 'react';
import { Provider } from 'react-redux';

persistStore(store);
export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
