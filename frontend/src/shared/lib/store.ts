import { CarouselReducer } from '@/shared/lib/features/carousel/carousel-slice';
import { categoryReducer } from '@/shared/lib/features/categories/category-slice';
import { footersReducer } from '@/shared/lib/features/footer/footers-slice';
import { newsReducer } from '@/shared/lib/features/news/news-slice';
import { ratingMembersReducer } from '@/shared/lib/features/rating-members/rating-members-slice';
import { ratingsReducer } from '@/shared/lib/features/rating/rating-slice';
import { rewardsReducer } from '@/shared/lib/features/rewards/rewards-slice';
import { tournamentsReducer } from '@/shared/lib/features/tournaments/tournamentsSlice';
import { usersSlice } from '@/shared/lib/features/users/users-slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import { tournamentHistoryReducer } from './features/tournament-history/tournament-history-slice';

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const authPersistConfig = {
  key: 'tennis:auth',
  storage: storage,
  whitelist: ['user', 'userPermission'],
};

const persistedReducer = persistReducer(authPersistConfig, usersSlice.reducer);

const rootReducer = combineReducers({
  users: persistedReducer,
  category: categoryReducer,
  carousel: CarouselReducer,
  ratingMembers: ratingMembersReducer,
  tournaments: tournamentsReducer,
  news: newsReducer,
  footers: footersReducer,
  ratings: ratingsReducer,
  rewards: rewardsReducer,
  tournamentHistory: tournamentHistoryReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
