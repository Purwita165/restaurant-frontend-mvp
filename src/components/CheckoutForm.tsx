'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '@/features/cart/cartSlice';
import axios from '@/services/api/axios';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.phone || !formData.address) {
      setError('Semua field wajib diisi.');
      return;
    }

    setLoading(true);

    try {
      const cartResponse = await axios.get('/cart');
      const items = cartResponse.data;

      const orderData = {
        items,
        customerName: formData.name,
        phone: formData.phone,
        address: formData.address,
      };

      await axios.post('/orders', orderData);
      dispatch(clearCart());
      navigate('/orders');
    } catch (err) {
      setError('Gagal menyimpan pesanan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container mx-auto px-4 py-8 max-w-2xl'>
      <h1 className='text-3xl font-bold mb-6'>Checkout</h1>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <Label htmlFor='name'>Nama Lengkap *</Label>
          <Input
            id='name'
            type='text'
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor='phone'>Nomor HP *</Label>
          <Input
            id='phone'
            type='tel'
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
          />
        </div>

        <div>
          <Label htmlFor='address'>Alamat Lengkap *</Label>
          <Input
            id='address'
            type='text'
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            required
          />
        </div>

        <Button type='submit' className='w-full' disabled={loading}>
          {loading ? 'Memproses...' : 'Pesanan Saya'}
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;
