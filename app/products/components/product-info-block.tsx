"use client";

import React, { useState } from "react";
import { addItem } from "@/store/slice/cartSlice";
import { useDispatch } from "react-redux";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
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

  console.log(quantity);

  return (
    <>
      <div className="text-primary flex flex-col gap-4">
        <h2 className="text-3xl">{product.title}</h2>
        <p>€{product.price}</p>
        <p className="text-sm leading-[18px] text-primary max-w-[500px]">
          {product.description}
        </p>
        <div>
          <button
            onClick={decrease}
            className="px-2 py-1 bg-gray-200 text-black rounded"
          >
            -
          </button>

          <input
            type="number"
            value={quantity}
            onChange={handleInputChange}
            min={1}
            className="w-12 text-center border rounded"
          />

          <button
            onClick={increase}
            className="px-2 py-1 bg-gray-200 text-black rounded"
          >
            +
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          className="border-primary uppercase text-sm bg-[#a6ccef] w-fit px-8 py-3 rounded-full"
        >
          Add To Cart
        </button>
      </div>
    </>
  );
};

export default ProductInfo;
