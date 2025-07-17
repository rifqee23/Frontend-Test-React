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
  price: number;
  onClick?: () => void;
}) {
  return (
    <div className="lg:w-1/4 md:w-1/2 w-full p-4">
      <div className="h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col">
        <div className="w-full aspect-[4/3] overflow-hidden">
          <ImageLink
            src={src}
            alt={alt}
            className="object-cover object-center w-full h-full"
            onClick={onClick}
          />
        </div>

        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-brand-yellow text-xs font-semibold tracking-wide uppercase mb-1">
              {category}
            </h3>
            <h2 className="text-brand-gray text-lg font-semibold mb-2">
              {title}
            </h2>
          </div>
          <p className="text-brand-yellow font-bold text-base mt-2">
            {Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(price)}
          </p>
        </div>
      </div>
    </div>
  );
}
