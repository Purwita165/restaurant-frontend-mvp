import { useQuery } from '@tanstack/react-query';
import axios from '@/services/api/axios';
import type { Restaurant } from '@/types/restaurant';

export default function useRestaurantsQuery(
  params?: {
    q?: string; // 👈 Tambahkan ini
    category?: string;
    sort?: 'name-asc' | 'price-asc' | 'price-desc' | 'rating-desc';
  }
) {
  return useQuery<Restaurant[], Error>({
    queryKey: ['restaurants', params],
    queryFn: async () => {
      const { data } = await axios.get('/api/resto', { params }); // 👈 Ini penting!
      return data.data.restaurants;
    },
    staleTime: 60_000,
  });
}