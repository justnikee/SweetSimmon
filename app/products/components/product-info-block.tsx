"use client";

import React, { useEffect, useState } from "react";
import { addItem } from "@/store/slice/cartSlice";
import { useDispatch } from "react-redux";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

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

type DeliveryOptionProp = {
  subscribable: boolean;
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
      <div className="text-primary flex flex-col">
        <h2 className="text-3xl flex justify-between w-full">
          {product.title}{" "}
          <span className="text-[10px] flex items-center gap-1 leading-3">
            {product.inStock ? (
              <>
                <span className="w-1.5 h-1.5 bg-[#8edf5e] rounded-full block"></span>
                In Stock
              </>
            ) : (
              "Out of Stock"
            )}
          </span>
        </h2>
        <div className="flex gap-0.5 text-sm mt-2.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Image
              key={i}
              src={"/images/icons/star.png"}
              height={16}
              width={16}
              alt="star"
              className="object-contain"
            />
          ))}
          <span className="ml-2">(20 Reviews)</span>
        </div>

        <p className="my-3.5">€ {product.price}</p>
        <div className="flex flex-col gap-4 my-4">
          <div className="flex flex-wrap gap-1">
            {product.benefits?.map((tag, key) => (
              <span
                key={key}
                className="uppercase text-sm leading-4.5 bg-super-lightblue text-primary-blue px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="text-sm text-primary">
            <span>Skin Types: </span>
            {product.skinTypes.map((type, i) => (
              <span key={i}>
                {type}
                {product.skinTypes.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>

          <p className="text-sm leading-[18px] text-primary max-w-[500px]">
            {product.description}
          </p>
        </div>

        <DeliveryOptions subscribable={product.isSubscribable} />

        <div className="flex gap-3 mt-4">
          <div className="flex border border-[#495a6f] w-fit">
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
              className="w-4 text-center gap-1 rounded focus:outline-none focus:ring-0"
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
            Add To Bag
          </button>
        </div>

        <Accordion className="mt-8" type="single" collapsible>
          {product.details && (
            <AccordionItem value="item-1">
              <AccordionTrigger>Details</AccordionTrigger>
              <AccordionContent>{product.details}</AccordionContent>
            </AccordionItem>
          )}
          {product.keyIngredients && (
            <AccordionItem value="item-2">
              <AccordionTrigger>Key Ingredients</AccordionTrigger>
              <AccordionContent>{product.keyIngredients}</AccordionContent>
            </AccordionItem>
          )}
          {product.clinicalStudies && (
            <AccordionItem value="item-3">
              <AccordionTrigger>Clinical Studies</AccordionTrigger>
              <AccordionContent>{product.clinicalStudies}</AccordionContent>
            </AccordionItem>
          )}
          {product.howToUse && (
            <AccordionItem value="item-4">
              <AccordionTrigger>How To Use</AccordionTrigger>
              <AccordionContent>{product.howToUse}</AccordionContent>
            </AccordionItem>
          )}
          {product.fullIngredients && (
            <AccordionItem value="item-5">
              <AccordionTrigger>Full Ingredients</AccordionTrigger>
              <AccordionContent>{product.fullIngredients}</AccordionContent>
            </AccordionItem>
          )}
          {product.sustainablePackaging && (
            <AccordionItem value="item-6">
              <AccordionTrigger>Sustainable Packaging</AccordionTrigger>
              <AccordionContent>
                {product.sustainablePackaging}
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>
    </>
  );
};

function DeliveryOptions({ subscribable }: DeliveryOptionProp) {
  const [selected, setSelected] = useState("subscribe");
  useEffect(() => {
    setSelected(subscribable ? "subscribe" : "oneTime");
  }, [subscribable]);

  return (
    <div className="py-4 space-y-2">
      {subscribable && (
        <label
          className={`flex items-start justify-between border p-4 cursor-pointer border-[#495a6f]`}
        >
          <div className="flex items-center">
            <input
              type="radio"
              name="delivery"
              value="subscribe"
              checked={selected === "subscribe"}
              onChange={() => setSelected("subscribe")}
              className="mr-4"
            />
            <div className="flex items-center">
              <p className="font-extrabold text-sm">Subscribe + save 15%</p>
              <a href="#" className="text-[12px] text-[#495a6f] underline ml-4">
                Learn more
              </a>
            </div>
          </div>

          <select className="border px-2 py-1 text-[12px] border-primary">
            <option>every 30 days</option>
            <option>every 60 days</option>
            <option>every 90 days</option>
          </select>
        </label>
      )}

      <label
        className={`flex items-center border p-4 cursor-pointer border-[#495a6f]`}
      >
        <input
          type="radio"
          name="delivery"
          value="oneTime"
          checked={selected === "oneTime"}
          onChange={() => setSelected("oneTime")}
          className="mr-4"
        />
        <span className="font-extrabold text-sm">One time delivery</span>
      </label>
    </div>
  );
}

export default ProductInfo;
