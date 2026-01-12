"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

interface ZoomableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
}

export function ZoomableImage({ src, alt, ...props }: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  if (!src) return null;

  return (
    <>
      <figure className="my-12 group">
        <div className="overflow-hidden rounded-xl bg-gray-100 cursor-zoom-in relative" onClick={openModal}>
          {/* We use a regular img tag here because we might not have dimensions for Next/Image 
              from markdown content, unless we parse/fetch them. Keeping it simple with img for now 
              but styled to look good. */}
          <img
            src={src}
            alt={alt}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.01]"
            loading="lazy"
            {...props}
          />
        </div>
        {alt && <figcaption className="mt-4 text-center text-sm text-gray-500 font-medium">{alt}</figcaption>}
      </figure>

      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/95 backdrop-blur-sm cursor-zoom-out p-4 sm:p-8 transition-opacity duration-300 animate-in fade-in"
            onClick={closeModal}
          >
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <img src={src} alt={alt} className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-lg" />
              {alt && <p className="mt-6 text-center text-gray-600 font-medium">{alt}</p>}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
