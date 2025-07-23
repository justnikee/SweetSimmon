"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import type { Splide as SplideInstance } from "@splidejs/splide";
import "@splidejs/react-splide/css";

type Images = {
  images: string[];
  tags: string[];
};

const ImageBlock = ({ images, tags }: Images) => {
  const mainSliderRef = useRef<SplideInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    if (mainSliderRef.current) {
      mainSliderRef.current.go(index);
      setActiveIndex(index);
    }
  };

  return (
    <div className="flex gap-0.5">
      {/* Thumbnails */}
      <div className="shrink-0 max-h-[42rem] overflow-y-auto scrollbar-hide flex flex-col gap-0.5 pr-0.5">
        {images?.map((image, i) => (
          <button
            key={i}
            onClick={() => handleThumbnailClick(i)}
            className={`relative w-[100px] h-[130px] min-h-[130px] border-2 overflow-hidden 
              ${
                activeIndex === i
                  ? "border-black"
                  : "border-transparent hover:border-gray-300"
              }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${i + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Slider */}
      <div className="w-full">
        {tags?.map((tag) => (
          <span className="bg-lightblue uppercase text-sm">{tag}</span>
        ))}
        <Splide
          options={{
            direction: "ttb",
            height: "42rem",
            wheel: true,
            arrows: false,
            pagination: false,
            drag: false,
          }}
          onMounted={(splide: any) => {
            mainSliderRef.current = splide;
          }}
          onMove={(splide: any) => {
            setActiveIndex(splide.index);
          }}
          aria-label="Product Images"
        >
          {images?.map((image, i) => (
            <SplideSlide key={i}>
              <div className="relative w-full h-[42rem]">
                <Image
                  src={image}
                  alt={`Main Image ${i + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default ImageBlock;
