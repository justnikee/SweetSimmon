import Link from "next/link";
import React from "react";
import FilterButton from "./filter-button";

type Category = {
  slug: string;
  name: string;
};

type Props = {
  collection: Category[];
};

const ShopFilter = async () => {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    }/api/collections`
  );
  const collection = await res.json();

  return (
    <div className="border-t border-b border-[#A3BFDB] px-8 py-4 mb-5 flex justify-between items-center sticky top-[72px] bg-white">
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
      <FilterButton />
    </div>
  );
};

export default ShopFilter;
