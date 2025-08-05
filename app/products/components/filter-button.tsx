"use client";

import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { openFilter } from "@/store/slice/filterSlice";

const FilterButton = () => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(openFilter())}
      className="flex gap-2 items-center cursor-pointer"
    >
      <p className="uppercase text-sm">Filter</p>
      <Image src={"/images/filter.png"} height={12} width={12} alt="filter" />
    </div>
  );
};

export default FilterButton;
