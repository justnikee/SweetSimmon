"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { megaMenuData } from "@/data/megaMenuData";
import { motion } from "framer-motion";

const MegaMenu = () => {
  const defaultImages = [
    "/images/mega-menu/m1.webp",
    "/images/mega-menu/m2.jpg",
  ];
  const [activeImages, setActiveImages] = useState<string[]>(defaultImages);

  return (
    <>
      <div className="flex-1 grid grid-cols-4 gap-8">
        {Object.entries(megaMenuData).map(([sectionTitle, links]) => (
          <div key={sectionTitle} className="space-y-2 flex flex-col">
            <div className="font-semibold capitalize">
              {sectionTitle.replace(/([A-Z])/g, " $1")}
            </div>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:underline"
                onMouseEnter={() => setActiveImages(link.images)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="flex gap-6 flex-1">
        {activeImages.map((img, i) => (
          <Link href="#" key={i} className="flex-1">
            <motion.div
              className="h-full"
              key={img}
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              <Image
                src={img}
                height={500}
                width={350}
                alt={`Preview ${i}`}
                className="w-full h-full transition duration-300 object-cover"
              />
            </motion.div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default MegaMenu;
