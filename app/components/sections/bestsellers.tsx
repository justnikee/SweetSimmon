import { Suspense } from "react";
import ProductsSliderWrapper from "./ProductsSliderWrapper";
import Bestseller from "../skeletons/bestseller";

type Props = {
  heading: string;
  subheading: string;
};

const Products = ({ heading, subheading }: Props) => {
  return (
    <section className="flex justify-center py-14">
      <div className="max-w-[1440px] px-2 w-full">
        <div className="mb-8">
          <h2 className="text-4xl leading-10 text-primary mb-2">{heading}</h2>
          <p className="text-sm leading-4.5">{subheading}</p>
        </div>

        <Suspense fallback={<Bestseller />}>
          <ProductsSliderWrapper />
        </Suspense>
      </div>
    </section>
  );
};

export default Products;
