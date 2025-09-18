// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import filterReducer from '../features/filters/filterSlice';

// ✅ LANGKAH PERTAMA: Buat store terlebih dahulu
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filters: filterReducer,
  },
});

// ✅ LANGKAH KEDUA: Baru setelah store dibuat, ekstrak tipe-nya
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;