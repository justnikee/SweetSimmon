import React from "react";
import ImageBlock from "./product-img-block";
import ProductInfo from "./product-info-block";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  inStock: boolean;
  isSubscribable: boolean;
  subscriptionDiscountPercent: number | null;
  subscriptionInterval: string | null;
  benefits: string[];
  skinTypes: string[];
  volume: string | null;
  details: string | null;
  keyIngredients: string | null;
  clinicalStudies: string | null;
  howToUse: string | null;
  fullIngredients: string | null;
  sustainablePackaging: string | null;
};

const ProductComponent = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white">
      <div className="container flex gap-6 h-full relative">
        <div className="flex-1">
          <ImageBlock tags={product.tags} images={product.images} />
        </div>
        <div className="flex-1">
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
