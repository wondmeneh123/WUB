import React, { useState, useEffect } from "react";
import { MdDiscount } from "react-icons/md";

const Carousel = () => {
  const slides = [
    { title: "Men's Fashion Collection", subtitle: "Discount up to 60%" },
    { title: "Women's Fashion Collection", subtitle: "Discount up to 50%" },
    { title: "Kid's Wear Collection", subtitle: "Discount up to 40%" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); 

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [slides.length]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Carousel Content */}
      <div className="overflow-hidden  rounded-xl">
        <div
          className="flex h-32 transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full p-4 bg-[#d43790] text-white flex justify-around items-center"
            >
              <div className="flex flex-col">
                <p className="font-bold text-lg">{slide.title}</p>
                <p className="text-sm">{slide.subtitle}</p>
              </div>
              <MdDiscount size={50} color="#fff" />
            </div>
          ))}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center space-x-2 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-[#d43790]" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
