export default function Input({
  className,
  placeholder,
  value,
}: {
  className: string;
  placeholder: string;
  value: string;
}) {
  return (
    <>
      <input
        type="text"
        className={className}
        placeholder={placeholder}
        value={value}
      />
    </>
  );
}
