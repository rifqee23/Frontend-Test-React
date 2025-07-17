import { IoIosClose } from 'react-icons/io';

export default function FilterBadge({
  selectedCategory,
  onClear,
}: {
  selectedCategory: string;
  onClear: () => void;
}) {
  return (
    <div className="badge badge-outline my-3 flex gap-2 items-center">
      Filtering by <strong>{selectedCategory}</strong>
      <button className="text-red-500 hover:text-red-700" onClick={onClear}>
        <IoIosClose size={30} />
      </button>
    </div>
  );
}
