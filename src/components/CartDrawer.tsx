// src/components/CartDrawer.tsx
'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQty, clearCart } from '@/features/cart/cartSlice';
import { formatCurrency } from '@/lib/formatCurrency';
import type { CartItem } from '@/types';
import { useState } from 'react';
import { Link } from 'react-router-dom'; // 👈 INI YANG BENAR!

const CartDrawer = () => {
  const [open, setOpen] = useState(false);
  const cartItems = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce((sum: number, item: CartItem) => sum + item.price * item.qty, 0);

  const handleUpdateQty = (id: string, newQty: number) => {
    dispatch(updateQty({ id, qty: newQty }));
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  if (cartItems.length === 0) return null;

  return (
    <>
      {/* ✅ GANTI Drawer → Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItems.reduce((acc: number, item: CartItem) => acc + item.qty, 0)}
            </span>
          </Button>
        </DialogTrigger>

        {/* ✅ GANTI DrawerContent → DialogContent */}
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Keranjang Saya</h2>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <XIcon className="h-5 w-5" /> {/* ✅ Sudah di-import dari lucide-react */}
              </Button>
            </div>

            <div className="space-y-4 mb-6">
              {cartItems.map((item: CartItem) => (
                <div key={item.id} className="flex items-center gap-4 p-3 border rounded-lg">
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">{formatCurrency(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateQty(item.id, item.qty - 1)}
                      disabled={item.qty <= 1}
                    >
                      -
                    </Button>
                    <span>{item.qty}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateQty(item.id, item.qty + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleRemove(item.id)}>
                    Hapus
                  </Button>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={handleClear}>
                Kosongkan
              </Button>
              <Button className="flex-1" asChild>
                {/* ✅ GANTI RouterLink → Link */}
                <Link to="/checkout">Checkout</Link>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CartDrawer;