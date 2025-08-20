// import React from "react";
// import ProductComponent from "../components/product-component";
// import Link from "next/link";

// interface PageProps {
//   params: Promise<{ slug: string }>;
// }

// const page = async ({ params }: PageProps) => {
//   const { slug } = await params;
//   const res = await fetch(
//     `${
//       process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
//     }/api/products/${slug}`
//   );

//   const data = await res.json();
//   const product = await data.product;

//   console.log(data);
//   return (
//     <div className="pb-20 pt-8">
//       <div className="max-w-[1440px] px-10 m-auto">
//         <div className="text-[10px] mb-6 flex items-center gap-1.5">
//           <Link className="uppercase text-[#495a6f]" href={"/"}>
//             Home
//           </Link>{" "}
//           /{" "}
//           <Link
//             className="text-black font-extrabold"
//             href={`/products/${product.slug}`}
//           >
//             {product.title}
//           </Link>
//         </div>
//         <ProductComponent product={product} />
//       </div>
//     </div>
//   );
// };

// export default page;

import React from "react";
import ProductComponent from "../components/product-component";
import Link from "next/link";
import { PrismaClient } from "@/app/generated/prisma";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

interface PageProps {
  params: Promise<{ slug: string }>;
}

const page = async ({ params }: PageProps) => {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="pb-20 pt-8">
      <div className="max-w-[1440px] px-10 m-auto">
        <div className="text-[10px] mb-6 flex items-center gap-1.5">
          <Link className="uppercase text-[#495a6f]" href={"/"}>
            Home
          </Link>{" "}
          /{" "}
          <Link
            className="text-black font-extrabold"
            href={`/products/${product.slug}`}
          >
            {product.title}
          </Link>
        </div>
        <ProductComponent product={product} />
      </div>
    </div>
  );
};

export default page;
