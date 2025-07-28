import Link from "next/link";
import React from "react";
import Image from "next/image";

type Product = {
  id: number;
  title: string;
  images: string[];
  price: number;
  slug: string;
};

const ShopCards = ({ id, title, images, price, slug }: Product) => {
  return (
    <div className="">
      <Link className="relative group" href={`/products/${slug}`}>
        <div className="relative">
          {images.slice(0, 2).map((image, index) => (
            <Image
              key={index}
              className={`lg:h-[600px] ease-in-out duration-500 transition-opacity object-cover ${
                index === 1
                  ? "relative z-0"
                  : "absolute top-0 left-0 z-[1] opacity-0 group-hover:opacity-100"
              }`}
              src={image}
              height={800}
              width={800}
              alt={title}
            />
          ))}
        </div>

        <div className="bg-white py-4 px-2 flex justify-between">
          <h3 className="text-primary font-extrabold text-sm">{title}</h3>
          <span className="text-primary font-extrabold text-sm">${price}</span>
        </div>
      </Link>
    </div>
  );
};

export default ShopCards;
