import React from "react";
import ShopCards from "@/app/products/components/shop-cards";
import ShopFilter from "@/app/products/components/shop-filter";
import ShopHederText from "../components/shop-header-text";
import { notFound } from "next/navigation";

type Product = {
  id: number;
  title: string;
  images: string[];
  price: number;
  slug: string;
};

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { slug } = await params;

  const resolvedSearchParams = await searchParams;

  const sort = resolvedSearchParams.sort || "new";

  console.log("Sort:", sort);

  let response;
  if (slug === "all") {
    response = await fetch(
      `${
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      }/api/products?sort=${sort}`,
      {
        next: { revalidate: 3600 },
      }
    );
  } else {
    response = await fetch(
      `${
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      }/api/collections/${slug}?sort=${sort}`,
      {
        next: { revalidate: 3600 },
      }
    );
  }

  const data = await response.json();
  const products: Product[] = data;

  if (products.length < 1) {
    return notFound();
  }

  return (
    <div className="bg-white relative">
      <div className="container pt-10 !pb-5">
        <ShopHederText slug={slug} />
      </div>
      <ShopFilter />
      <div className="grid lg:grid-cols-4 md:grid-cols-3 px-8 gap-x-1 gap-y-8">
        {products?.map((product) => (
          <ShopCards
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            images={product.images}
            slug={product.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
