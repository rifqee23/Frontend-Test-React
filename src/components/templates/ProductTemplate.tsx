import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useProducts } from '@/hooks/useProducts';
import { useLocalProducts } from '@/hooks/useLocalProducts';
import { useProductFilter } from '@/hooks/useProductFilter';
import { filterProducts } from '@/utils/filterProducts';

import ProductActions from '@/components/organisms/ProductActions';
import ProductGrid from '@/components/organisms/ProductGrid';
import FilterBadge from '@/components/organisms/FilterBadge';
import Pagination from '@/components/organisms/Pagination';
import ModalDetail from '@/components/molecules/ModalDetail';
import AddProductModal from '@/components/molecules/AddProductModal';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import ErrorMessage from '@/components/atoms/ErrorMessage';

import type { Product } from '@/type/Product';

export default function ProductTemplate() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deletedIds, setDeletedIds] = useState<number[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const {
    value,
    selectedCategory,
    isFiltering,
    handleChange,
    handleCategorySelect,
    clearFilter,
  } = useProductFilter();

  const { customProducts, setCustomProducts } = useLocalProducts();
  const { products, totalPages, isLoaded, error } = useProducts(
    currentPage,
    value,
    selectedCategory,
    isFiltering,
  );

  const handleAddProduct = (product: Product) => {
    setCustomProducts((prev) => [product, ...prev]);
    setShowAddModal(false);
  };

  const handleUpdateProduct = (
    id: number,
    updatedData: {
      title: string;
      price: number;
      tags: string;
      category: string;
    },
  ) => {
    const updated = customProducts.map((p) =>
      p.id === id
        ? {
            ...p,
            ...updatedData,
            tags: updatedData.tags.split(',').map((tag) => tag.trim()),
          }
        : p,
    );
    setCustomProducts(updated);
    const found = updated.find((p) => p.id === id);
    if (found) setSelectedProduct(found);
  };

  const displayedProducts = useMemo(() => {
    const all = [
      ...filterProducts(customProducts, value, selectedCategory),
      ...filterProducts(products, value, selectedCategory),
    ];
    return all.filter((p) => !deletedIds.includes(p.id));
  }, [customProducts, products, value, selectedCategory, deletedIds]);

  if (error) return <ErrorMessage message={error} />;
  if (!isLoaded) return <LoadingSpinner />;

  return (
    <>
      <div className="container px-5 mx-auto">
        <ProductActions
          value={value}
          onChange={handleChange}
          onCategorySelect={handleCategorySelect}
          onAddClick={() => setShowAddModal(true)}
        />

        {isFiltering && selectedCategory && (
          <FilterBadge
            selectedCategory={selectedCategory}
            onClear={clearFilter}
          />
        )}

        <ProductGrid
          products={displayedProducts}
          onSelect={setSelectedProduct}
        />

        <div className="flex justify-center gap-2 mt-6">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>

      {selectedProduct && (
        <ModalDetail
          id={selectedProduct.id}
          src={selectedProduct.thumbnail}
          alt={selectedProduct.title}
          title={selectedProduct.title}
          category={selectedProduct.category}
          price={selectedProduct.price}
          tags={selectedProduct.tags.join(', ')}
          onClose={() => setSelectedProduct(null)}
          onDelete={(id) => {
            const isCustom = customProducts.some((p) => p.id === id);
            if (isCustom) {
              setCustomProducts(customProducts.filter((p) => p.id !== id));
            } else {
              setDeletedIds((prev) => [...prev, id]);
            }
            setSelectedProduct(null);
          }}
          onUpdate={handleUpdateProduct}
        />
      )}

      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddProduct}
        />
      )}
    </>
  );
}
