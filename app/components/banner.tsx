"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import image1 from "/public/images/banner-images/Aevi-01.webp";
import image2 from "/public/images/banner-images/Aevi-02.webp";
import Button from "./ui/Button";
import { Splide, SplideSlide } from "@splidejs/react-splide";

type SlideProp = {
  title: string;
  url?: string;
  image: StaticImageData;
};

const Banner = () => {
  return (
    <section className="-mt-[120px] z-0 banner">
      <Splide
        options={{
          type: "loop",
          perPage: 1,
          autoplay: true,
          interval: 4000,
          pauseOnHover: false,
          arrows: false,
          pagination: true,
          speed: 600,
        }}
      >
        <SplideSlide>
          <BannerSlides
            title="NORDIC SKINCARE FOR SENSITIVE SKIN"
            image={image1}
            url="/collections/all"
          />
        </SplideSlide>
        <SplideSlide>
          <BannerSlides
            title="SKIN DETOX WITH THE CLARIFYING CLAY MASK"
            image={image2}
            url="/products/3"
          />
        </SplideSlide>
      </Splide>
    </section>
  );
};

function BannerSlides({ title, url, image }: SlideProp) {
  return (
    <div className="h-[700px] w-full relative">
      <Image
        className="w-full h-full object-cover"
        src={image}
        height={700}
        width={1920}
        alt="Hero Image"
      />
      <div className="absolute bottom-10 left-10 max-w-[700px]">
        <h2 className="text-[54px] leading-[59px] mb-6 uppercase text-white">
          {title}
        </h2>
        {url ? (
          <Button href={url} className="">
            Shop Now
          </Button>
        ) : (
          <Button className="">Shop Now</Button>
        )}
      </div>
    </div>
  );
}

export default Banner;
