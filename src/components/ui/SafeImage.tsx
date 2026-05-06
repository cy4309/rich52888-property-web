"use client";

import { useEffect, useState } from "react";

const FALLBACK_SRC = "/placeholder-no-image.png";

type SafeImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src?: string | null;
};

export default function SafeImage({ src, alt, onError, ...props }: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src?.trim() || FALLBACK_SRC);

  useEffect(() => {
    setCurrentSrc(src?.trim() || FALLBACK_SRC);
  }, [src]);

  return (
    <img
      {...props}
      src={currentSrc}
      alt={alt}
      onError={(e) => {
        if (currentSrc !== FALLBACK_SRC) {
          setCurrentSrc(FALLBACK_SRC);
        }
        onError?.(e);
      }}
    />
  );
}
