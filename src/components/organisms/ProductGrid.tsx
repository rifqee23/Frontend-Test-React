import Card from '@/components/organisms/Card';
import type { Product } from '@/type/Product';

export default function ProductGrid({
  products,
  onSelect,
}: {
  products: Product[];
  onSelect: (p: Product) => void;
}) {
  return (
    <div className="flex flex-wrap -m-4">
      {products.map((product) => (
        <Card
          key={product.id}
          src={product.thumbnail}
          alt={product.title}
          category={product.category}
          title={product.title}
          price={product.price}
          onClick={() => onSelect(product)}
        />
      ))}
    </div>
  );
}
