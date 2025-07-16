import Card from '@/components/organisms/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '@/components/organisms/Modal';

type Product = {
  id: number;
  thumbnail: string;
  category: string;
  title: string;
  price: string;
};

export default function ProductTemplate() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchData();
  }, []);

  if (error) return <p>{error}</p>;
  return (
    <>
      <div className="container px-5 mx-auto">
        <div className="flex flex-wrap -m-4">
          {products.slice(0, 8).map((product) => (
            <Card
              key={product?.id}
              src={product?.thumbnail}
              alt={product?.title}
              category={product?.category}
              title={product?.title}
              price={product?.price}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      </div>

      {selectedProduct && (
        <Modal onClose={() => setSelectedProduct(null)}>
          <h2 className="text-xl font-bold mb-2">{selectedProduct.title}</h2>
        </Modal>
      )}
    </>
  );
}
