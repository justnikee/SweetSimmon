import Image from "next/image";
import Link from "next/link";

type Product = {
  images: string[];
  title: string;
  price: number;
  id: number;
};

type CardProduct = {
  product: Product;
};

function Card({ product }: CardProduct) {
  return (
    <div className="">
      <Link className="group" href={`${product.id}`}>
        {product.images?.slice(0, 2).map((image, idx) => (
          <Image
            key={idx}
            className={`h-full w-full max-h-[400px] object-cover transition-all duration-200 ease-in-out  ${
              idx === 0
                ? "absolute top-0 left-0 opacity-0 group-hover:opacity-100 z-10"
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
