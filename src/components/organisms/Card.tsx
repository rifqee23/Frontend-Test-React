import ImageLink from '@/components/molecules/ImageLink';

export default function Card({
  src,
  alt,
  category,
  title,
  price,
  onClick,
}: {
  src: string;
  alt: string;
  category: string;
  title: string;
  price: string;
  onClick?: () => void;
}) {
  return (
    <>
      <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
        <ImageLink
          src={src}
          alt={alt}
          className={'object-cover object-center w-full '}
          onClick={onClick}
        />
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
            {category}
          </h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">
            {title}
          </h2>
          <p className="mt-1">{price}</p>
        </div>
      </div>
    </>
  );
}
