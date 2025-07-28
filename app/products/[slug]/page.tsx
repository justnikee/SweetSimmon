import React from "react";
import ProductComponent from "../components/product-component";

interface PageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { slug } = params;

  console.log(slug, "slug");
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    }/api/products/${slug}`
  );

  const data = await res.json();
  const product = await data.product;

  console.log(data);
  return (
    <div className="py-20">
      <div className="max-w-[1440px] px-10 m-auto">
        <ProductComponent product={product} />
      </div>
    </div>
  );
};

export default page;
