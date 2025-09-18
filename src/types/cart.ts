// src/types/cart.ts
export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  imageUrl?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerName: string;
  phone: string;
  address: string;
  createdAt: string;
}

export interface CheckoutFormData {
  name: string;
  phone: string;
  address: string;
}