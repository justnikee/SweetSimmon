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
  console.log(product, "card");
  return (
    <div className="">
      <Link href={`${product.id}`}>
        {product.images?.slice(0, 2).map((image, idx) => (
          <Image
            key={idx}
            className={`h-full w-full object-cover ${
              idx === 1 ? "absolute top-0 left-0 opacity-0 z-0" : ""
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
