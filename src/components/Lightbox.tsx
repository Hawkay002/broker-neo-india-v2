import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: { src: string; label: string; property: string }[];
  startIndex: number;
  onClose: () => void;
}

export default function Lightbox({ images, startIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(startIndex);

  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] bg-foreground/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-card hover:text-primary transition-colors z-50"
        aria-label="Close"
      >
        <X className="w-8 h-8" />
      </button>

      <button
        onClick={prev}
        className="absolute left-4 md:left-10 text-card hover:text-primary transition-colors z-50"
        aria-label="Previous"
      >
        <ChevronLeft className="w-10 h-10" />
      </button>

      <button
        onClick={next}
        className="absolute right-4 md:right-10 text-card hover:text-primary transition-colors z-50"
        aria-label="Next"
      >
        <ChevronRight className="w-10 h-10" />
      </button>

      <motion.div
        key={index}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-5xl w-full max-h-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[index].src}
          alt={images[index].label}
          className="max-w-full max-h-[80vh] object-contain border-2 border-card/20"
        />
        <div className="text-center mt-6">
          <p className="font-sans font-bold text-card text-lg md:text-xl">{images[index].label}</p>
          <p className="font-mono text-card/50 text-xs uppercase tracking-widest mt-1">{images[index].property}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
