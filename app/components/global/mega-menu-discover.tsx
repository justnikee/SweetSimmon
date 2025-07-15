import React, { useState } from "react";
import { discoverMenuData } from "@/data/megaMenuData";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const Discover = () => {
  const defaultImages = [
    "/images/mega-menu/m1.webp",
    "/images/mega-menu/m2.jpg",
  ];

  const [activeImages, setActiveImages] = useState<string[]>(defaultImages);

  return (
    <>
      <div className="flex-1 grid grid-cols-4 gap-8">
        <div className="space-y-2 flex flex-col col-span-1">
          {discoverMenuData.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:underline"
              onMouseEnter={() => {
                if (link.images) setActiveImages(link.images);
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
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
                className={`w-full h-full transition duration-300 object-cover`}
              />
            </motion.div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Discover;
