"use client";

import Image from "next/image";

interface ImageCardProps {
  src: string;
  alt: string;
}

export function ImageCard({ src, alt }: ImageCardProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      style={{ objectFit: "cover" }}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
      }}
    />
  );
}
