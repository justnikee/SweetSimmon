"use client";

import React, { useState } from "react";
import { addItem } from "@/store/slice/cartSlice";
import { useDispatch } from "react-redux";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  tags: string[];
  inStock: boolean;
  isSubscribable: boolean;
  subscriptionDiscountPercent: number;
  subscriptionInterval: string;
  benefits: string[];
  skinTypes: string[];
  volume: string;
  details: string;
  keyIngredients: string;
  clinicalStudies: string;
  howToUse: string;
  fullIngredients: string;
  sustainablePackaging: string;
};

const ProductInfo = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const increase = () => setQuantity((prev) => prev + 1);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  function handleAddToCart() {
    dispatch(addItem({ ...product, quantity }));
  }

  return (
    <>
      <div className="text-primary flex flex-col gap-4">
        <h2 className="text-3xl flex justify-between w-full">
          {product.title}{" "}
          <span className="text-[12px]">
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </h2>
        <p>€{product.price}</p>
        <p className="text-sm leading-[18px] text-primary max-w-[500px]">
          {product.description}
        </p>
        <div className="flex gap-3">
          <div className="flex border border-lightblue w-fit">
            <button
              onClick={decrease}
              className="px-3 py-1 text-primary rounded cursor-pointer"
            >
              -
            </button>

            <input
              type="number"
              value={quantity}
              onChange={handleInputChange}
              min={1}
              className="w-4 text-center rounded focus:outline-none focus:ring-0"
            />

            <button
              onClick={increase}
              className="px-3 py-1 text-primary rounded cursor-pointer"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="border-primary border uppercase text-sm bg-[#a6ccef] max-w-2xs w-full px-8 py-3 rounded-full cursor-pointer"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
