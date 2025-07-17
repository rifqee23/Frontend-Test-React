import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Product } from '@/type/Product';

export function useProducts(
  currentPage: number,
  value: string,
  selectedCategory: string | null,
  isFiltering: boolean,
) {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const limit = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const skip = (currentPage - 1) * limit;
        let url = value
          ? `https://dummyjson.com/products/search?q=${value}`
          : isFiltering && selectedCategory
            ? `https://dummyjson.com/products/category/${selectedCategory}`
            : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

        const res = await axios.get(url);
        setProducts(res.data.products);
        setTotalPages(Math.ceil(res.data.total / limit));
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setIsLoaded(true);
      }
    };

    fetchData();
  }, [currentPage, value, selectedCategory, isFiltering]);

  return { products, totalPages, isLoaded, error };
}
