import React, { useState } from 'react';

type Props = {
  src?: string; // Chemin depuis public/, ex: "/mon-image.jpg"
  alt?: string;
  className?: string;
};

const DEFAULT_IMG = '/image-adhesion.jpg';
const FALLBACK_IMG = '/image-adhesion-placeholder.jpg';

const ImagePlaceholder: React.FC<Props> = ({ src, alt = "Image d'illustration", className = '' }) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src || DEFAULT_IMG);

  return (
    <div className={`relative h-full w-full bg-slate-100 rounded-2xl overflow-hidden hidden lg:block ${className}`}>
      <img
        src={currentSrc}
        alt={alt}
        onError={() => setCurrentSrc(FALLBACK_IMG)}
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default ImagePlaceholder;


