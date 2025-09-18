// src/pages/HomePage.tsx
import { useEffect, useState } from 'react';
import useRestaurantsQuery from '@/services/queries/useRestaurantsQuery';
import FilterBar from '@/components/FilterBar';
import RestaurantCard from '@/components/RestaurantCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { Filters } from '@/types/filters'; // 👈 Pastikan ada

export default function HomePage() {
  const [filters, setFilters] = useState<Filters>({
    category: null,
    sort: 'name-asc',
    search: '', // 👈 Ini untuk search
  });

  const { data: restaurants, isLoading, error } = useRestaurantsQuery({
    q: filters.search || undefined, // 👈 Kirim ke backend
    category: filters.category || undefined,
    sort: filters.sort || undefined,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Menu Makanan</h1>

      {/* 👇 INI SUDAH BAIK — JANGAN DIUBAH */}
      <FilterBar
        categories={[]} // Karena backend tidak punya /categories
        filters={filters}
        onFilterChange={setFilters} // 👈 Ini otomatis update state
      />

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center py-4">
          Gagal memuat menu.
        </div>
      )}

      {!isLoading && !error && restaurants && restaurants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        !isLoading && !error && (
          <div className="text-center py-12 text-gray-500">
            {filters.search ? 'Tidak ditemukan restoran sesuai pencarian.' : 'Tidak ada restoran.'}
          </div>
        )
      )}
    </div>
  );
}