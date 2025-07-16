import Image from '@/components/atoms/Image';
import { useState } from 'react';

export default function ImageLink({
  src,
  alt,
  className,
  onClick,
}: {
  src: string;
  alt: string;
  className: string;
  onClick?: () => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const placeholder = 'https://placehold.co/420x260?text=Loading...';
  return (
    <>
      <div onClick={onClick}>
        {!isLoaded && (
          <Image src={placeholder} alt={'placeholder'} className={className} />
        )}
        <Image
          src={src}
          alt={alt}
          className={className}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </>
  );
}
