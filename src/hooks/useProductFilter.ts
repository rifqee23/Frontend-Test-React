import { useState } from 'react';

export function useProductFilter() {
  const [value, setValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFiltering, setIsFiltering] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setSelectedCategory(null);
    setIsFiltering(false);
  };

  const handleCategorySelect = (slug: string | null) => {
    setSelectedCategory(slug);
    setIsFiltering(!!slug);
    if (slug) setValue('');
  };

  const clearFilter = () => {
    setSelectedCategory(null);
    setIsFiltering(false);
  };

  return {
    value,
    selectedCategory,
    isFiltering,
    handleChange,
    handleCategorySelect,
    clearFilter,
  };
}
