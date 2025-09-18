// src/components/FilterBar.tsx
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import type { Filters, FilterSortOption } from '@/types/filters';

interface FilterBarProps {
  categories: string[];
  filters: Filters;
  onFilterChange: (newFilters: Filters) => void;
}

export default function FilterBar({ categories, filters, onFilterChange }: FilterBarProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleSortChange = (value: FilterSortOption | '') => {
    onFilterChange({ ...filters, sort: value || null });
  };

  const handleCategoryChange = (value: string) => {
    onFilterChange({ ...filters, category: value === 'all' ? null : value });
  };

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-gray-50 rounded-lg p-4">
      {/* Kategori */}
      <Select value={filters.category || 'all'} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Semua Kategori" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Kategori</SelectItem>
          {categories.length > 0 ? (
            categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="all" disabled>
              Tidak ada kategori tersedia
            </SelectItem>
          )}
        </SelectContent>
      </Select>

      {/* Sort */}
      <Select value={filters.sort || ''} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Urutkan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name-asc">Nama: A-Z</SelectItem>
          <SelectItem value="price-asc">Harga: Terendah</SelectItem>
          <SelectItem value="price-desc">Harga: Tertinggi</SelectItem>
          <SelectItem value="rating-desc">Rating: Tertinggi</SelectItem>
        </SelectContent>
      </Select>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <Input
          type="text"
          placeholder="Cari restoran..."
          value={filters.search}
          onChange={handleSearch}
          className="w-full"
        />
      </div>

      {/* Reset */}
      <Button
        variant="outline"
        onClick={() =>
          onFilterChange({
            category: null,
            sort: 'name-asc',
            search: '',
          })
        }
      >
        Reset
      </Button>
    </div>
  );
}