"use client";

import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const announcemetText = [
  "ENJOY FREE SHIPPING OVER €150 | SHOP NOW",
  "SIGN UP TO OUR NEWSLETTER FOR 10% OFF",
  "BEST FACE OIL OF 2024 | NOURISHING FACE OIL",
];

const AnnouncementBar = () => {
  return (
    <div className="bg-lightblue transition-colors duration-200 ease-in-out z-[2] relative">
      <Splide
        options={{
          direction: "ttb",
          height: "36px",
          type: "loop",
          autoplay: true,
          interval: 5000,
          arrows: false,
          pagination: false,
          pauseOnHover: false,
          drag: false,
          speed: 600,
          easing: "cubic-bezier(0.77, 0, 0.175, 1)",
        }}
      >
        {announcemetText.map((text, index) => (
          <SplideSlide className="flex justify-center items-center" key={index}>
            <div className="text-[#134fc2] text-[12px] uppercase font-extrabold flex items-center justify-center h-10 w-full text-center leading-none whitespace-nowrap">
              {text}
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default AnnouncementBar;
