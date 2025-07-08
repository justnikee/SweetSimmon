"use client";

import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Aisha Khanna",
    feedback:
      "The persimmons were incredibly sweet and fresh! Packaging was beautiful too.",
  },
  {
    name: "Rohit Sharma",
    feedback:
      "I didn’t expect such premium quality from a local farm — totally exceeded expectations.",
  },
  {
    name: "Emily Walker",
    feedback:
      "Fast delivery and amazing taste! I’ll definitely order again next season.",
  },
  {
    name: "Kunal Verma",
    feedback: "Your website made ordering so easy. My family loved the fruits!",
  },
  {
    name: "Sara Lee",
    feedback:
      "A rare fruit with excellent taste. Highly recommend your store to my friends abroad.",
  },
];

const Testimonials = () => {
  const options = {
    type: "loop",
    gap: "1rem",
    autoplay: true,
    pauseOnHover: true,
    perPage: 3,
    arrows: false,
    pagination: false,
    breakpoints: {
      768: {
        perPage: 1,
      },
      1024: {
        perPage: 2,
      },
    },
  };

  return (
    <section className="py-12 bg-[#264EBB]">
      <div className="max-w-[1440px] mx-auto px-4">
        <Splide options={options} aria-label="Customer Testimonials">
          {testimonials.map((item, i) => (
            <SplideSlide key={i}>
              <div className=" p-6 text-center flex flex-col gap-1 h-full">
                <div className="flex gap-0.5 justify-center">
                  {Array.from({ length: 5 }).map((i) => (
                    <Star
                      size={20}
                      color="#ffffff"
                      strokeWidth={0.75}
                      absoluteStrokeWidth
                    />
                  ))}
                </div>
                <h2 className="text-white text-lg leading-6 ">
                  “{item.feedback}”
                </h2>
                <h4 className="font-semibold text-[12px] text-white uppercase">
                  {item.name}
                </h4>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default Testimonials;
