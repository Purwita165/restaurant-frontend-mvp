import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type FilterState = {
  category: string | null
  searchQuery: string
  sort: 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc' | null
}

const initialState: FilterState = {
  category: null,
  searchQuery: '',
  sort: null,
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.category = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setSort: (state, action: PayloadAction<FilterState['sort']>) => {
      state.sort = action.payload
    },
    resetFilters: (state) => {
      state.category = null
      state.searchQuery = ''
      state.sort = null
    },
  },
})

export const { setCategory, setSearchQuery, setSort, resetFilters } = filterSlice.actions
export default filterSlice.reducer