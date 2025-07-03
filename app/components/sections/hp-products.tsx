import React from "react";
import Card from "../card";

const Products = () => {
  return (
    <section>
      <div className="max-w-[1440px] px-10">
        <div>
          <h2 className="text-4xl leading-10 text-primary">BESTSELLERS</h2>
          <p>
            Dermatologist-tested and clinically proven formulas with Nordic
            ingredients
          </p>
        </div>
        <div className="flex">
          <Card
            heading="Earing"
            image="/images/product-images/hp-prod-image.webp"
            url={"#"}
          />
          <Card
            heading="Earing"
            image="/images/product-images/hp-prod-image.webp"
            url={"#"}
          />
          <Card
            heading="Earing"
            image="/images/product-images/hp-prod-image.webp"
            url={"#"}
          />
          <Card
            heading="Earing"
            image="/images/product-images/hp-prod-image.webp"
            url={"#"}
          />
        </div>
      </div>
    </section>
  );
};

export default Products;
