// src/services/queries/useRestaurantByIdQuery.ts
import { useQuery } from '@tanstack/react-query';
import axios from '@/services/api/axios';
import type { Restaurant } from '@/types/restaurant';

export function useRestaurantByIdQuery(id: number) {
  return useQuery<Restaurant, Error>({
    queryKey: ['restaurant', id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/resto/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}