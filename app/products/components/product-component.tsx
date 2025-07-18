import React from "react";
import ImageBlock from "./product-img-block";
import ProductInfo from "./product-info-block";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
};

const ProductComponent = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white">
      <div className="container flex gap-10">
        <div className="flex-1">
          <ImageBlock images={product.images} />
        </div>
        <div className="flex-1">
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
