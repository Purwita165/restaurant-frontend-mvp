// src/services/queries/useRestaurantsQuery.ts
import { useQuery } from '@tanstack/react-query';
import axios from '@/services/api/axios';
import type { Restaurant } from '@/types/restaurant';

export default function useRestaurantsQuery() {
  return useQuery<Restaurant[], Error>({
    queryKey: ['restaurants'],
    queryFn: async () => {
      const { data } = await axios.get('/api/resto');
      return data.data.restaurants; // 👈 INI YANG BENAR — ambil dari dalam "data"
    },
    staleTime: 60_000,
  });
}