import { useEffect, useState } from 'react';
import axios from 'axios';

type Category = {
  name: string;
  slug: string;
};

export default function Dropdown({
  onCategorySelect,
}: {
  onCategorySelect: (slug: string) => void;
}) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          'https://dummyjson.com/products/categories',
        );
        setCategories(res.data);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-sm bg-brand-yellow-light border border-brand-yellow text-gray-700 hover:bg-brand-yellow hover:text-black min-h-0 h-8 px-3 transition"
      >
        Filter
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow-md bg-white rounded-md w-52 z-[1] max-h-60 overflow-auto border border-brand-yellow-light"
      >
        {categories.map((category, idx) => (
          <li key={idx}>
            <button
              className="capitalize text-sm text-gray-800 hover:bg-brand-yellow-light w-full text-left px-2 py-1 rounded"
              onClick={() => onCategorySelect(category.slug)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
