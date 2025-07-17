import type { Product } from '@/type/Product';

export function filterProducts(
  products: Product[],
  search: string,
  category: string | null,
) {
  return products.filter((p) => {
    const matchCategory = !category || p.category === category;
    const matchSearch =
      !search || p.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });
}
