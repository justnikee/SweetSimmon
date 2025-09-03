"use client";

import React, { useEffect } from "react";
import { Search, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { closeSearchBar } from "@/store/slice/searchSlice";
import IsScrolled from "@/app/hooks/checkScroll";

const SearchBar = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const isOpne = useSelector((state: RootState) => state.searchBar.isOpen);

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

  window.addEventListener("scroll", function () {
    if (IsScrolled()) {
      document.querySelector("body")?.classList.add("scrolling");
    } else {
      document.querySelector("body")?.classList.remove("scrolling");
    }
  });

  return (
    <motion.div
      initial={false}
      animate={isOpne ? "open" : "collapsed"}
      variants={{
        open: { height: "auto", opacity: 1 },
        collapsed: { height: 0, opacity: 0 },
      }}
      transition={{
        duration: 0.5,
        ease: [0.77, 0, 0.175, 1],
      }}
      className={`fixed top-[109px] w-full bg-white search-bar ${
        isOpne ? "overflow-auto" : "overflow-hidden"
      }`}
    >
      <div className="px-8 py-6 m-auto">
        <div className="flex justify-end mb-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#231f20"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x-icon lucide-x cursor-pointer"
            onClick={() => dispatch(closeSearchBar())}
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
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
    </motion.div>
  );
};

function SearchResult({ products }: any) {
  return (
    <div className="grid grid-cols-5 gap-3 my-5">
      {products.map((product: any, index: number) => (
        <Link href={`/products/${product.slug}`} key={index} className="">
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
