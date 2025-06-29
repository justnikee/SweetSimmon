"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";

export default function FilterDrawer() {
  const [selected, setSelected] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  function handleCheckboxChange(value: string) {
    setSelected((prev) => (prev === value ? null : value));
  }

  return (
    <div className="">
      <div
        onClick={() => setDrawerOpen(true)}
        className="flex gap-2 items-center cursor-pointer"
      >
        <p className="uppercase text-sm">Filter</p>
        <Image src={"/images/filter.png"} height={12} width={12} alt="filter" />
      </div>
      <div
        className={`absolute h-screen w-lg bg-white top-0 z-[11] p-8 transition-all duration-500 ease-in-out ${
          drawerOpen ? "right-0" : "-right-[32rem]"
        }`}
      >
        <div className="flex flex-col gap-6 relative h-full w-full">
          <div className="flex justify-between">
            <span className="uppercase text-primary text-[12px]">Filter</span>
            <span
              onClick={() => setDrawerOpen(false)}
              className="uppercase text-primary text-[12px] cursor-pointer"
            >
              Close
            </span>
          </div>
          <div>
            <p className="uppercase bold text-primary text-[12px] mb-3.5">
              Sort By
            </p>
            <form className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label className="text-sm text-primary" htmlFor="new">
                  New
                </label>
                <input
                  checked={selected === "new"}
                  onChange={() => handleCheckboxChange("new")}
                  type="checkbox"
                  name="new"
                  id="new"
                />
              </div>
              <div className="flex justify-between items-center">
                <label className="text-sm text-primary" htmlFor="lowtohigh">
                  Price - Low to High
                </label>
                <input
                  checked={selected === "lowtohigh"}
                  onChange={() => setSelected("lowtohigh")}
                  type="checkbox"
                  name="lowtohigh"
                  id="lowtohigh"
                />
              </div>
              <div className="flex justify-between items-center">
                <label className="text-sm text-primary" htmlFor="hightolow">
                  Price - High to Low
                </label>
                <input
                  checked={selected === "hightolow"}
                  onChange={() => setSelected("hightolow")}
                  type="checkbox"
                  name="hightolow"
                  id="hightolow"
                />
              </div>
            </form>
          </div>
          <div className="absolute bottom-0 left-0 flex gap-4 w-full">
            <span className="border border-primary text-sm py-3 flex-1 text-center rounded-full leading-3.5 cursor-pointer">
              Clear All
            </span>
            <span className="border border-primary text-sm py-3 flex-1 text-center rounded-full leading-3.5 bg-[#D5E0EA] cursor-pointer">
              Apply
            </span>
          </div>
        </div>
      </div>
      <div
        onClick={() => setDrawerOpen(false)}
        className={`${
          drawerOpen
            ? "opacity-30 z-[10] bg-black absolute top-0 left-0 w-screen h-screen body-overflow-hidden cursor-pointer"
            : ""
        }`}
      ></div>
    </div>
  );
}
