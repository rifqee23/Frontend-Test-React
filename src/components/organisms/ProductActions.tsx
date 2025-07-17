import SearchBar from '@/components/molecules/SearchBar';

export default function ProductActions({
  value,
  onChange,
  onCategorySelect,
  onAddClick,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategorySelect: (slug: string | null) => void;
  onAddClick: () => void;
}) {
  return (
    <>
      <button className="btn bg-brand-yellow mb-4" onClick={onAddClick}>
        + Add Product
      </button>
      <SearchBar
        value={value}
        onChange={onChange}
        onCategorySelect={onCategorySelect}
      />
    </>
  );
}
