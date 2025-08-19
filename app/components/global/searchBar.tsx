"use client";

import React, { useEffect } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  async function searchProducts() {
    if (!search.trim()) {
      setProducts([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `/api/search?query=${encodeURIComponent(search)}`
      );
      const json = await res.json();

      if (!res.ok) {
        console.log("Search failed:", json.message || "No products found");
        setProducts([]);
      } else {
        setProducts(json.data || []);
      }
    } catch (error) {
      console.error("Error searching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchProducts();
      console.log(search);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div>
      <div className="px-8 py-6 m-auto">
        <div className="flex items-center w-full border-b border-black gap-3">
          <Search color="#231f20" strokeWidth={0.5} width={20} />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-0 shadow-none outline-none focus:shadow-none h-8"
          ></input>
        </div>
        <SearchResult products={products} />
      </div>
    </div>
  );
};

function SearchResult({ products }: any) {
  return (
    <div className="flex justify-start w-full gap-3 my-5">
      {products.map((product: any, index: number) => (
        <Link href={`/products/${product.slug}`} key={index} className="w-1/4">
          <Image src={product.images[0]} height={600} width={400} alt="" />
          <div className="flex justify-between py-2 px-2">
            <p className="font-bold">{product.title}</p>{" "}
            <p className="font-bold">${product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SearchBar;
