export default function Image({
  src,
  alt,
  className,
  onLoad,
}: {
  src: string;
  alt: string;
  className: string;
  onLoad?: () => void;
}) {
  return (
    <>
      <img src={src} alt={alt} className={className} onLoad={onLoad} />
    </>
  );
}
