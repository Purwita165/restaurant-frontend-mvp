// src/types/filters.ts
export type FilterSortOption =
  | 'name-asc'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc';

export interface Filters {
  sort: FilterSortOption | null;
  search: string;
}