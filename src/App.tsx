// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import OrdersPage from '@/pages/OrdersPage';
import RestaurantDetailPage from '@/pages/RestaurantDetailPage'; // 👈 TAMBAHKAN INI
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/restaurant/:id" element={<RestaurantDetailPage />} /> {/* 👈 BARIS INI */}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
        </main>
        <CartDrawer />
        <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
          © 2025 RestoApp. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;