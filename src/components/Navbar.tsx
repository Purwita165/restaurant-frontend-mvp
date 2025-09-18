// src/components/Navbar.tsx
'use client';

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCartIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const Navbar = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          RestoApp
        </Link>

        {/* Search & Cart */}
        <div className="flex items-center space-x-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Cari makanan..."
            className="border border-gray-300 rounded-full px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Cari menu makanan"
          />

          {/* Cart Button with Badge */}
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="relative"
            aria-label="Lihat keranjang belanja"
          >
            <Link to="/cart">
              <ShoppingCartIcon className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;