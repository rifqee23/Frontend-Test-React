import { useEffect, useState } from 'react';
import type { Product } from '@/type/Product';

export function useLocalProducts() {
  const [customProducts, setCustomProducts] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('customProducts');
    if (stored) {
      setCustomProducts(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('customProducts', JSON.stringify(customProducts));
  }, [customProducts]);

  return { customProducts, setCustomProducts };
}
