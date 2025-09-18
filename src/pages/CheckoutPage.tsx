// src/pages/CheckoutPage.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CheckoutFormData } from '@/types/form'; 

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>(); // 👈 TYPED! DENGAN INTERFACE

  const onSubmit = async (data: CheckoutFormData) => { // 👈 TYPED! DAN DIGUNAKAN
    setLoading(true);
    
    // ✅ Sekarang 'data' digunakan — contoh: kirim ke backend
    console.log('Form data:', data); // Hapus ini nanti, hanya untuk debugging
    
    // Simulasi submit ke backend (ganti dengan axios.post nanti)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert('Pesanan berhasil dibuat!');
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <div className="md:col-span-2">
            <Label htmlFor="address">Alamat Lengkap *</Label>
            <Input
              id="address"
              {...register('address', { required: 'Alamat wajib diisi' })}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address.message as string}</p>
            )}
          </div>
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Memproses...' : 'Bayar Sekarang'}
        </Button>
      </form>
    </div>
  );
}