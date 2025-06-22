// lib/store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
// Don't import storage at top-level; load only on client
import type { Storage } from "redux-persist";

import { baseApi } from "./api/baseApi";
import { publicApi } from "./api/publicApi";

import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";
import themeReducer from "./features/theme/themeSlice";
import { productsApi } from "./api/productsApi";
import { businessesApi } from "./api/buissinessApi";

// Combine all reducers
const combinedReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [publicApi.reducerPath]: publicApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [businessesApi.reducerPath]: businessesApi.reducer,
  auth: authReducer,
  cart: cartReducer,
  sidebar: sidebarReducer,
  theme: themeReducer,
});

// Wrap for Next.js hydration
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combinedReducer(state, action);
};

// Helper: no-op storage for SSR
const createNoopStorage = (): Storage => ({
  getItem: () => Promise.resolve(null),
  setItem: (_, value) => Promise.resolve(value),
  removeItem: () => Promise.resolve(),
});

// Only use real localStorage on client
const isClient = typeof window !== "undefined";
const getStorage = async () => {
  if (isClient) {
    const storage = await import("redux-persist/lib/storage");
    return storage.default;
  }
  return createNoopStorage();
};
const storage: Storage = await getStorage();

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "theme", "cart"],
};

// Use persisted reducer only on client
const persistedReducer = isClient
  ? persistReducer(persistConfig, rootReducer)
  : rootReducer;

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            FLUSH,
            REHYDRATE,
            PAUSE,
            PERSIST,
            PURGE,
            REGISTER,
            HYDRATE,
          ],
        },
      }).concat(
        baseApi.middleware,
        publicApi.middleware,
        productsApi.middleware,
        businessesApi.middleware
      ),
  });

  if (isClient) {
    // @ts-expect-error: attach persistor
    store.__persistor = persistStore(store);
  }

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: false });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;
