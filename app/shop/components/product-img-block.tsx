"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import type { Splide as SplideInstance } from '@splidejs/splide';
import '@splidejs/react-splide/css';

type Images = {
  images: string[];
};

const ImageBlock = ({ images }: Images) => {
  const mainSliderRef = useRef<SplideInstance | null>(null);

  const handleThumbnailClick = (index: number) => {
    if (mainSliderRef.current) {
      mainSliderRef.current.go(index);
    }
  };

  return (
    <div className="flex gap-4">
      <div className="shrink-0">
        <div className="flex flex-col gap-2 overflow-y-auto">
          {images?.map((image, i) => (
            <button key={i} onClick={() => handleThumbnailClick(i)}>
              <Image
                src={image}
                alt={`Thumbnail ${i + 1}`}
                width={150}
                height={190}
                className="object-cover transition"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="w-full">
        <Splide
          options={{
            direction: 'ttb',
            height: '42rem',
            wheel: true,
            arrows: false,
            pagination: false,
            drag: false,
          }}
          onMounted={(splide: any) => {
            mainSliderRef.current = splide;
          }}
          aria-label="Product Images"
        >
          {images?.map((image, i) => (
            <SplideSlide key={i}>
              <Image
                src={image}
                alt={`Main Image ${i + 1}`}
                width={1000}
                height={1000}
                className=" w-full object-contain"
              />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default ImageBlock;
