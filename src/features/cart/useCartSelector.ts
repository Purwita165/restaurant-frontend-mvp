// src/features/cart/useCartSelector.ts
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

export function useCartSelector() {
  return useSelector((state: RootState) => state.cart.items);
}