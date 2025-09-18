// src/pages/CartPage.tsx
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCartSelector } from '@/features/cart/useCartSelector';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '@/features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { CartItem, CheckoutFormData } from '@/types/cart';
import { formatCurrency } from '@/lib/formatCurrency';
import { useState } from 'react'; 
import { removeFromCart } from '@/features/cart/cartSlice';

export default function CartPage() {
  const cartItems = useCartSelector();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
    },
  });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const onSubmit = async (data: CheckoutFormData) => {
    setLoading(true);
    try {
      // Simulasi submit ke backend (opsional)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert('Pesanan berhasil dibuat!');
      dispatch(clearCart()); // Kosongkan keranjang setelah checkout
      navigate('/orders'); // Arahkan ke riwayat pesanan
    } catch (err) {
      alert('Gagal membuat pesanan.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Keranjang Belanja</h1>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Keranjang Anda kosong.</p>
          <Button className="mt-4" onClick={() => navigate('/')}>
            Lanjut Belanja
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Keranjang Belanja</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Daftar Item */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="p-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img
                  src={item.imageUrl || '/placeholder-image.jpg'}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-image.jpg';
                  }}
                />
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    {formatCurrency(item.price)} × {item.qty}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{formatCurrency(item.price * item.qty)}</span>
                <Button variant="outline" size="sm" onClick={() => dispatch(removeFromCart(item.id))}>
                  Hapus
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Form Checkout */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detail Pesanan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nama Lengkap *</Label>
                  <Input
                    id="name"
                    {...register('name', { required: 'Nama wajib diisi' })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message as string}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Nomor HP *</Label>
                  <Input
                    id="phone"
                    {...register('phone', { required: 'Nomor HP wajib diisi' })}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message as string}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="address">Alamat Lengkap *</Label>
                  <Input
                    id="address"
                    {...register('address', { required: 'Alamat wajib diisi' })}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address.message as string}</p>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold text-lg">{formatCurrency(total)}</span>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? 'Memproses...' : 'Checkout'}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full mt-2"
                    onClick={() => dispatch(clearCart())}
                  >
                    Hapus Semua
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}