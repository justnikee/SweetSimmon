import Image from "next/image";
import Link from "next/link";

type Product = {
  images: string[];
  title: string;
  price: number;
  id: number;
  slug: string;
  tags: string[];
};

type CardProduct = {
  product: Product;
};

function Card({ product }: CardProduct) {
  return (
    <div className="">
      <Link className="group" href={`/products/${product.slug}`}>
        {product.tags[0] && (
          <span className="absolute top-2 left-2 z-[2] text-[#134fc2] bg-[#d5e0ea] text-sm leading-4.5 px-2 py-0.5">
            {product.tags[0]}
          </span>
        )}
        {product.images?.slice(0, 2).map((image, idx) => (
          <Image
            key={idx}
            className={`h-full w-full max-h-[400px] object-cover transition-all duration-200 ease-in-out  ${
              idx === 1
                ? "absolute top-0 left-0 opacity-0 group-hover:opacity-100 z-1"
                : "relative z-0"
            }`}
            src={image}
            alt="Product Image"
            height={600}
            width={400}
          />
        ))}

        <div className="flex justify-between items-center py-2.5 px-2.5">
          <h3 className="text-sm font-extrabold text-primary">
            {product.title}
          </h3>
          <p className="text-sm font-extrabold text-primary">
            {product.price}$
          </p>
        </div>
      </Link>
    </div>
  );
}

export default Card;
