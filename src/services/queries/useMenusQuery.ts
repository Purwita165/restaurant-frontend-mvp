// src/services/queries/useMenusQuery.ts
import { useQuery } from '@tanstack/react-query';
import axios from '@/services/api/axios';
import type { MenuItem } from '@/types';

export function useMenusQuery(params?: {
  q?: string | undefined;
  category?: string | undefined;
  sort?: 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc' | undefined;
}) {
  return useQuery<MenuItem[], Error>({
    queryKey: ['menus', params],
    queryFn: async () => {
      const { data } = await axios.get('/menus', { params });
      return data;
    },
    staleTime: 60_000,
  });
}