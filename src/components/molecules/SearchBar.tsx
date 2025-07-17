import Dropdown from '@/components/atoms/Dropdown';

export default function SearchBar({
  value,
  onChange,
  onCategorySelect,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategorySelect: (slug: string) => void;
}) {
  return (
    <div className="mb-4 flex items-center gap-3 bg-brand-yellow-light border border-brand-yellow rounded-md px-4 py-2 max-w-xl w-full shadow-sm focus-within:ring-2 focus-within:ring-brand-yellow transition">
      <input
        type="search"
        className="flex-grow bg-transparent outline-none text-sm placeholder-gray-600 text-brand-gray"
        placeholder="Search products..."
        value={value}
        onChange={onChange}
      />
      <div className="shrink-0">
        <Dropdown onCategorySelect={onCategorySelect} />
      </div>
    </div>
  );
}
