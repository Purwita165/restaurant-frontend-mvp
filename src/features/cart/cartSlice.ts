// src/features/cart/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'; // 👈 Tambahkan ini!
import type { CartItem } from '@/types';

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const found = state.items.find(i => i.id === action.payload.id);
      if (found) {
        found.qty += action.payload.qty;
      } else {
        state.items.push(action.payload);
      }
    },
    updateQty: (state, action: PayloadAction<{ id: string; qty: number }>) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.qty = Math.max(1, action.payload.qty);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateQty, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;