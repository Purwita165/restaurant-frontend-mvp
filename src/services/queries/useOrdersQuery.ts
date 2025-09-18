import { useQuery } from '@tanstack/react-query';
import axios from '@/services/api/axios';
import type { Order } from '../../types';

export function useOrdersQuery() {
  return useQuery<Order[], Error>({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data } = await axios.get('/orders');
      return data;
    },
    staleTime: 60_000,
  });
}
