// src/pages/HomePage.tsx
import { useEffect, useState } from 'react';
import useRestaurantsQuery from '@/services/queries/useRestaurantsQuery';
import RestaurantCard from '@/components/RestaurantCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomePage() {
  const { data: restaurants, isLoading, error } = useRestaurantsQuery();

  // Jika error, tampilkan pesan
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        Gagal memuat daftar restoran. Silakan coba lagi nanti.
      </div>
    );
  }

  // Jika loading, tampilkan skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Menu Makanan</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  // Jika data kosong
  if (!restaurants || restaurants.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-500">
        Tidak ada restoran ditemukan.
      </div>
    );
  }

  // ✅ SEMUA AMAN — TAMPILKAN DAFTAR RESTORAN
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Menu Makanan</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}