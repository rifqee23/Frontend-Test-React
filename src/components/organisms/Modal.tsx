import Image from '@/components/atoms/Image';

type ModalProps = {
  onClose: () => void;
  src: string;
  alt: string;
  category: string;
  title: string;
  price: string;
  tags: string;
};

export default function Modal({
  src,
  alt,
  category,
  title,
  price,
  tags,
  onClose,
}: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-2xl font-bold"
        >
          ×
        </button>

        <div className="space-y-4">
          <div className="w-full aspect-video overflow-hidden rounded-xl">
            <Image
              src={src}
              alt={alt}
              className="object-contain w-full h-full"
            />
          </div>

          <div className="space-y-2">
            <span className="text-sm text-indigo-600 font-medium uppercase">
              {category}
            </span>

            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>

            <div className="flex flex-wrap gap-2">
              {tags.split(',').map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>

            <p className="text-lg text-indigo-700 font-bold mt-2">
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(parseInt(price))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
