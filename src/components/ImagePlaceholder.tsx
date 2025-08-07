import React from 'react';
import { Image } from 'lucide-react';

const ImagePlaceholder: React.FC = () => {
  return (
    <div className="relative h-full w-full bg-slate-100 rounded-2xl overflow-hidden hidden lg:block">
      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
        <Image className="w-16 h-16 mb-4" />
        <p className="text-center font-medium">
          Votre image d'adhésion ici.
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Placez votre image dans le dossier `public` et mettez à jour le chemin.
        </p>
      </div>
      <img 
        src="/image-adhesion-placeholder.jpg" 
        alt="Processus d'adhésion SIGOMAP" 
        className="object-cover w-full h-full opacity-20"
      />
    </div>
  );
};

export default ImagePlaceholder;


