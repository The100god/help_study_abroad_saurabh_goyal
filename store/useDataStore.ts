import { create } from 'zustand';
import axios from 'axios';
import { User, Product } from '@/types';

interface DataState {
  users: User[];
  products: Product[];
  totalUsers: number;
  totalProducts: number;
  isLoading: boolean;
  
  // Cache storage: key = query params string, value = data
  userCache: Record<string, { users: User[], total: number }>;
  
  fetchUsers: (limit: number, skip: number, search?: string) => Promise<void>;
  fetchProducts: (limit: number, skip: number, search?: string, category?: string) => Promise<void>;
}

export const useDataStore = create<DataState>((set, get) => ({
  users: [],
  products: [],
  totalUsers: 0,
  totalProducts: 0,
  isLoading: false,
  userCache: {},

  fetchUsers: async (limit, skip, search = '') => {
    // 3c. Optimization: Client-Side Caching Strategy
    // We create a unique key based on params. If data exists, use it to avoid API calls.
    const cacheKey = `users-${limit}-${skip}-${search}`;
    const cachedData = get().userCache[cacheKey];

    if (cachedData) {
      set({ users: cachedData.users, totalUsers: cachedData.total });
      return;
    }

    set({ isLoading: true });
    try {
      const endpoint = search 
        ? `https://dummyjson.com/users/search?q=${search}&limit=${limit}&skip=${skip}`
        : `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;
        
      const res = await axios.get(endpoint);
      
      set((state) => ({
        users: res.data.users,
        totalUsers: res.data.total,
        isLoading: false,
        // Update Cache
        userCache: {
          ...state.userCache,
          [cacheKey]: { users: res.data.users, total: res.data.total }
        }
      }));
    } catch (error) {
      console.error("Failed to fetch users", error);
      set({ isLoading: false });
    }
  },

  fetchProducts: async (limit, skip, search = '', category = '') => {
    set({ isLoading: true });
    try {
      let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
      if (search) url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`;
      if (category) url = `https://dummyjson.com/products/category/${category}`;

      const res = await axios.get(url);
      set({ products: res.data.products, totalProducts: res.data.total, isLoading: false });
    } catch (error) {
      console.error(error);
      set({ isLoading: false });
    }
  },
}));