import React from "react";
import Card from "../sections/bestseller-card";

type Product = {
  images: string[];
  title: string;
  price: number;
  id: number;
  slug: string;
};

const Upsell = async () => {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    }/api/products`,
    {
      cache: "no-store",
    }
  );
  const products = await res.json();

  return (
    <div className="">
      <div>
        <h3>You May Also Like</h3>
        <div className="flex overflow-x-scroll">
          {products.map((product: Product, i: number) => (
            <Card key={i} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upsell;
