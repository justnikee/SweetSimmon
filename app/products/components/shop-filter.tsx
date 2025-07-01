import Link from "next/link";
import React from "react";
import FilterDrawer from "./filter-drawer";

type Category = {
  slug: string;
  name: string;
};

type Props = {
  collection: Category[];
};

const ShopFilter = async () => {
  const res = await fetch("http://localhost:3000/api/collections");
  const collection = await res.json();

  return (
    <div className="border-t border-b border-[#A3BFDB] px-8 py-4 mb-5 flex justify-between items-center">
      <div className="flex gap-6">
        <Link
          className="text-sm leading-[18px] text-primary"
          href="/collections/all"
        >
          Shop All
        </Link>
        {collection.map((cat: Category, i: number) => (
          <Link
            key={i}
            className="text-sm leading-[18px] text-primary"
            href={cat.slug}
          >
            {cat.name}
          </Link>
        ))}
      </div>
      <FilterDrawer />
    </div>
  );
};

export default ShopFilter;
