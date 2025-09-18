// src/pages/RestaurantDetailPage.tsx
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useRestaurantByIdQuery } from '@/services/queries/useRestaurantByIdQuery';
import ProductCard from '@/components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

export default function RestaurantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { data: restaurant, isLoading, error } = useRestaurantByIdQuery(Number(id));

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Menu</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        Gagal memuat detail restoran.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{restaurant.name}</h1>
        <p className="text-gray-600 mt-2">{restaurant.place}</p>
        <div className="flex items-center mt-2">
          {restaurant.star ? (
            <div className="flex items-center text-yellow-500">
              <span className="mr-1">⭐</span>
              <span>{restaurant.star.toFixed(1)}</span>
            </div>
          ) : null}
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Menu</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {restaurant.menus.map((menu) => (
          <ProductCard key={menu.id} item={menu} />
        ))}
      </div>

      {restaurant.menus.length === 0 && (
        <p className="text-gray-500 mt-8">Belum ada menu tersedia.</p>
      )}

      <Button className="mt-8" onClick={() => window.history.back()}>
        ← Kembali ke Daftar Restoran
      </Button>
    </div>
  );
}