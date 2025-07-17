import Image from '@/components/atoms/Image';
import { IoIosClose } from 'react-icons/io';
import { useState, useEffect } from 'react';
import axios from 'axios';

type ModalProps = {
  onClose: () => void;
  src: string;
  alt: string;
  category: string;
  title: string;
  price: number;
  tags: string;
  id: number;
  onDelete: (id: number) => void;
  onUpdate: (
    id: number,
    updatedData: {
      title: string;
      price: number;
      tags: string;
      category: string;
    },
  ) => void;
};

type Category = {
  id: number;
  name: string;
  slug: string;
};

export default function ModalDetail({
  src,
  alt,
  category,
  title,
  price,
  tags,
  onClose,
  id,
  onDelete,
  onUpdate,
}: ModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedPrice, setEditedPrice] = useState(price);
  const [editedTags, setEditedTags] = useState(tags);
  const [editedCategory, setEditedCategory] = useState(category);

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          'https://dummyjson.com/products/categories',
        );
        const data = res.data;
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    fetchCategories();
  }, []);

  const handleUpdate = () => {
    onUpdate(id, {
      title: editedTitle,
      price: editedPrice,
      tags: editedTags,
      category: editedCategory,
    });
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-gray-light hover:text-brand-gray text-2xl font-bold cursor-pointer"
        >
          <IoIosClose />
        </button>

        <div className="space-y-4">
          <div className="w-full aspect-video overflow-hidden rounded-xl">
            <Image
              src={src}
              alt={alt}
              className="object-contain w-full h-full"
            />
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <input
                className="w-full border border-brand-gray-light rounded px-3 py-2"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <select
                className="w-full border border-brand-gray-light rounded px-3 py-2"
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <input
                className="w-full border border-brand-gray-light rounded px-3 py-2"
                value={editedTags}
                onChange={(e) => setEditedTags(e.target.value)}
              />
              <input
                type="number"
                className="w-full border border-brand-gray-light rounded px-3 py-2"
                value={editedPrice}
                onChange={(e) => setEditedPrice(Number(e.target.value))}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-brand-gray-light text-white px-4 py-2 rounded hover:bg-brand-gray transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <span className="text-xs text-brand-yellow font-semibold uppercase">
                {category}
              </span>

              <h2 className="text-xl font-semibold text-brand-gray">{title}</h2>

              <div className="flex flex-wrap gap-2">
                {tags.split(',').map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-brand-gray-light text-brand-gray text-xs px-2 py-1 rounded-full"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>

              <p className="text-lg text-brand-yellow font-bold mt-2">
                {Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(price)}
              </p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-brand-yellow text-white px-4 py-2 rounded hover:bg-yellow-400 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
