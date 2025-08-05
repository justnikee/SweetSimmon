"use client";

import React, { useEffect, useState } from "react";
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
  const [scrollY, setScrollY] = useState(0);
  console.log(scrollY);
  useEffect(() => {
    const getScroll = () => setScrollY(window.pageYOffset);
    window.addEventListener("scroll", getScroll);
    return () => window.removeEventListener("scroll", getScroll);
  }, []);

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
            url="/products/clarifying-clay-mask"
          />
        </SplideSlide>
      </Splide>
      <Image
        className={`absolute top-1/4 left-1/2 transform -translate-x-1/2 transition ease-in-out duration-150 ${
          scrollY < 1 ? "opactiy-1" : "opacity-0"
        }`}
        src={"/images/site-logo/logo.png"}
        height={400}
        width={600}
        alt="site logo"
      />
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
