import Card from '@/components/organisms/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '@/components/organisms/Modal';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../organisms/Pagination';

type Product = {
  id: number;
  thumbnail: string;
  category: string;
  title: string;
  price: string;
  tags: string[];
};

export default function ProductTemplate() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const limit = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const skip = (currentPage - 1) * limit;
        const response = await axios.get(
          `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
        );
        setProducts(response.data.products);
        setTotalPages(Math.ceil(response.data.total / limit));
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchData();
  }, [currentPage]);

  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="container px-5 mx-auto">
        <div className="flex flex-wrap -m-4">
          {products.map((product) => (
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

        <div className="flex justify-center gap-2 mt-6">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>

      {selectedProduct && (
        <Modal
          src={selectedProduct?.thumbnail}
          alt={selectedProduct?.title}
          category={selectedProduct?.category}
          title={selectedProduct?.title}
          price={selectedProduct?.price}
          tags={selectedProduct?.tags.join(', ')}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
