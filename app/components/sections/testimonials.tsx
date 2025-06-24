"use client"

import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const testimonials = [
  {
    name: 'Aisha Khanna',
    feedback: 'The persimmons were incredibly sweet and fresh! Packaging was beautiful too.',
  },
  {
    name: 'Rohit Sharma',
    feedback: 'I didn’t expect such premium quality from a local farm — totally exceeded expectations.',
  },
  {
    name: 'Emily Walker',
    feedback: 'Fast delivery and amazing taste! I’ll definitely order again next season.',
  },
  {
    name: 'Kunal Verma',
    feedback: 'Your website made ordering so easy. My family loved the fruits!',
  },
  {
    name: 'Sara Lee',
    feedback: 'A rare fruit with excellent taste. Highly recommend your store to my friends abroad.',
  },
];

const Testimonials = () => {
  const options = {
    type: 'loop',
    gap: '1rem',
    autoplay: true,
    pauseOnHover: true,
    perPage: 1,
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
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Customer Testimonials</h2>

        <Splide options={options} aria-label="Customer Testimonials">
          {testimonials.map((item, i) => (
            <SplideSlide key={i}>
              <div className="bg-gray-50 shadow-md p-6 rounded-xl text-center flex flex-col gap-4 h-full justify-between">
                <h2 className="text-gray-700 italic text-3xl">“{item.feedback}”</h2>
                <h4 className="font-semibold text-md text-orange-600">— {item.name}</h4>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default Testimonials;
