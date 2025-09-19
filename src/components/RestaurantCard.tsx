// src/components/RestaurantCard.tsx — VERSI YANG SUDAH BENAR
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StarIcon } from 'lucide-react';
import type { Restaurant } from '@/types/restaurant';
import { formatCurrency } from '@/lib/formatCurrency';

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  // ✅ AMAN: Ambil gambar pertama atau logo, fallback ke placeholder
  const firstImage =
    restaurant.images?.[0] || restaurant.logo || '/placeholder-image.jpg';

  // ✅ AMAN: Pastikan menus adalah array (bukan null/undefined)
  const menus = Array.isArray(restaurant.menus) ? restaurant.menus : [];

  // ✅ AMAN: Cari harga termurah hanya jika ada menu
  const minPrice = menus.length > 0
    ? Math.min(...menus.map(menu => menu.price))
    : 0;

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <img
          src={firstImage}
          alt={restaurant.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-image.jpg';
          }}
        />
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-lg font-semibold line-clamp-2">{restaurant.name}</CardTitle>

        {/* Rating Restoran */}
        <div className="flex items-center mt-2">
          {restaurant.star !== undefined && restaurant.star !== null ? (
            <div className="flex items-center text-yellow-500">
              <StarIcon className="h-4 w-4 fill-current" />
              <span className="ml-1 text-sm">{restaurant.star.toFixed(1)}</span>
            </div>
          ) : (
            <span className="text-sm text-gray-400">Belum ada rating</span>
          )}
        </div>

        {/* Harga Termurah dari Menu */}
        {menus.length > 0 && (
          <p className="text-xl font-bold text-gray-800 mt-2">
            Dari {formatCurrency(minPrice)}
          </p>
        )}

        {/* Tombol Lihat Menu */}
        <Button className="mt-4 w-full" onClick={() => window.location.href = `/restaurant/${restaurant.id}`}>
          Lihat Menu
        </Button>
      </CardContent>
    </Card>
  );
}