import { useEffect, useState } from 'react';
import type { Product } from '@/type/Product';
import axios from 'axios';

interface Props {
  onClose: () => void;
  onAdd: (product: Product) => void;
}

type Category = {
  name: string;
  slug: string;
};

export default function AddProductModal({ onClose, onAdd }: Props) {
  const [form, setForm] = useState({
    title: '',
    price: '',
    category: '',
    thumbnail: '',
    tags: '',
  });

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === 'thumbnail' && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          thumbnail: reader.result as string,
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = () => {
    const newProduct: Product = {
      id: Date.now(),
      title: form.title,
      price: parseInt(form.price),
      category: form.category,
      thumbnail: form.thumbnail,
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ''),
    };

    onAdd(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="input input-bordered w-full"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">Select Category</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleChange}
            className="file-input file-input-bordered w-full"
          />
          {form.thumbnail && (
            <img
              src={form.thumbnail}
              alt="Preview"
              className="w-full h-40 object-cover rounded"
            />
          )}
          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
            className="input input-bordered w-full"
          />
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
