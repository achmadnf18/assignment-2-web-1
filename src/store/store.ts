/* eslint-disable unicorn/prefer-spread */
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { promoApi } from 'services/promo';

import reducer from './reducer';

const persistConfig = {
  key: 'assignment',
  storage,
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, reducer),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(promoApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
