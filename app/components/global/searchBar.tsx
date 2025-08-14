"use client";

import React, { useEffect } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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
      <div className="max-w-[1440px] px-2 m-auto">
        <div className="flex items-center w-full border-b border-black gap-3">
          <Search />
          <input
            type="text"
            placeholder="search"
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
    <>
      {products.map((product: any) => (
        <div>
          <Image src={product.images[0]} height={600} width={400} alt="" />
          <div>
            <p>{product.title}</p> <p>{product.price}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default SearchBar;
