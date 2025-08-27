// components/ProductsSlider.tsx
"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import Card from "./bestseller-card";

type Product = {
  images: string[];
  title: string;
  price: number;
  id: number;
  slug: string;
  tags: string[];
};

function ProductsSlider({ products }: { products: Product[] }) {
  return (
    <Splide
      options={{
        type: "loop",
        perPage: 4,
        gap: "1rem",
        pagination: false,
        arrows: false,
        drag: true,
        breakpoints: {
          1024: { perPage: 2 },
          640: { perPage: 1 },
        },
      }}
      className="py-4"
    >
      {products.map((product, i) => (
        <SplideSlide key={i}>
          <Card product={product} />
        </SplideSlide>
      ))}
    </Splide>
  );
}

export default ProductsSlider;
