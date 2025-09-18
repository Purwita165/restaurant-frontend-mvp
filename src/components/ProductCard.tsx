// src/components/ProductCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StarIcon } from 'lucide-react';
import type { MenuItem } from '@/types/restaurant';
import { formatCurrency } from '@/lib/formatCurrency';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/features/cart/cartSlice';

interface ProductCardProps {
  item: MenuItem;
}

export default function ProductCard({ item }: ProductCardProps) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: item.id.toString(),
        name: item.foodName,
        price: item.price,
        qty: 1,
        imageUrl: item.image,
      })
    );
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <img
          src={item.image || '/placeholder-image.jpg'}
          alt={item.foodName}
          className="w-full h-48 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-image.jpg';
          }}
        />
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-lg font-semibold line-clamp-2">{item.foodName}</CardTitle>
        <p className="text-xl font-bold text-gray-800 mt-2">{formatCurrency(item.price)}</p>
        <Button className="mt-4 w-full" onClick={handleAddToCart}>
          Tambah ke Keranjang
        </Button>
      </CardContent>
    </Card>
  );
}