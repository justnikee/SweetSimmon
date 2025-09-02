import Link from "next/link";
import React from "react";
import Image from "next/image";

const CollectionShowcase = () => {
  return (
    <section className="h-full overflow-hidden">
      <div className="flex gap-2">
        <Link className="relative flex-1/4" href={""}>
          <Image
            src={"/images/collection-section/Aevi-Web-FaceSerum-03.webp"}
            height={1000}
            width={1000}
            alt="Image"
            className="object-cover h-full w-full"
          />
          <h3 className="absolute bottom-5 left-5 uppercase text-white text-2xl font-bold">
            bestseller
          </h3>
        </Link>
        <Link className="relative flex-1/4" href={""}>
          <Image
            src={"/images/collection-section/Aevi-Web-Homepage-04.webp"}
            height={1000}
            width={1000}
            alt="Image"
            className="object-cover h-full w-full"
          />
          <h3 className="absolute bottom-5 left-5 uppercase text-white text-2xl font-bold">
            New In
          </h3>
        </Link>
        <Link className="relative flex-1/2" href={""}>
          <Image
            src={"/images/collection-section/Aevi-Web-Homepage-NFO-01-1.webp"}
            height={1000}
            width={1000}
            alt="Image"
            className="object-cover h-full w-full"
          />
          <h3 className="absolute bottom-5 left-5 uppercase text-white text-2xl font-bold">
            bestseller
          </h3>
        </Link>
      </div>
    </section>
  );
};

export default CollectionShowcase;
