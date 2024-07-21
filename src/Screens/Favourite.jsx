import React from "react";
import Header from "../componenets/Header";
import { BiSearch } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";

import { MdDiscount } from "react-icons/md";
import "../componenets/components.css";
const Favourite = () => {
  return (
    <div className="">
      <Header />

      <div className="flex items-center  justify-between gap-3 px-5">
        <div className="flex bg-white items-center w-full p-2 rounded-2xl">
          <BiSearch size={20} />
          <input type="text" />
        </div>
        <div className="p-3 bg-[#CAF379] rounded-full active:border-0 active:border-white">
          <FiFilter size={20} className="" />
        </div>
      </div>
      <div className="flex  p-4 m-4 bg-slate-500 justify-around rounded-2xl text-white items-center">
        <div className="flex flex-col">
          <p>Men's Fashion Collection</p>
          <p>Discount up to 60%</p>
        </div>
        <MdDiscount size={50} color="#CAF379" />
      </div>
      <div className="flex overflow-x-scroll gap-2 px-4 text-sm my-2 gg">
        <div className="bg-[#CAF379] px-2 py-1 rounded-xl flex justify-center items-center">
          Jacket
        </div>
        <div className="bg-white px-2 py-1 rounded-xl flex justify-center items-center">
          Tshirts
        </div>
        <div className="bg-white px-2 py-1 rounded-xl flex justify-center items-center">
          Shirts
        </div>
        <div className="bg-white px-2 py-1 rounded-xl flex justify-center items-center">
          Socks
        </div>
        <div className="bg-white px-2 py-1 rounded-xl flex justify-center items-center">
          Jacket
        </div>
        <div className="bg-white px-2 py-1 rounded-xl flex justify-center items-center">
          Jacket
        </div>
      </div>
      <div className="px-4 text-xl font-semibold flex flex-col overflow-y-scroll">
        <p className="my-5">Popular</p>
        <div className="flex gap-3">
          <div className="flex flex-col gap-2">
            <img
              src="https://atlas-content-cdn.pixelsquid.com/stock-images/perfume-bottle-dox7ee1-600.jpg"
              width={200}
              className="rounded-2xl"
            />
            <p className="text-md ml-2 my-1">
              1250<b> Br</b>
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <img
              src="https://banner2.cleanpng.com/20231220/qjq/transparent-cartoon-perfume-pink-flowers-bottle-cork-stopper-elegant-perfume-bottle-with-pink-flower-1710957206668.webp"
              width={120}
              className="rounded-2xl"
            />
            <p className="text-md ml-2 my-1">
              700<b> Br</b>
            </p>
          </div>
          
        </div>
        <div className="flex gap-3">
          <div className="flex flex-col gap-2">
            <img
              src="https://atlas-content-cdn.pixelsquid.com/stock-images/perfume-bottle-dox7ee1-600.jpg"
              width={200}
              className="rounded-2xl"
            />
            <p className="text-md ml-2 my-1">
              1250<b> Br</b>
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <img
              src="https://atlas-content-cdn.pixelsquid.com/stock-images/perfume-bottle-dox7ee1-600.jpg"
              width={200}
              className="rounded-2xl"
            />
            <p className="text-md ml-2 my-1">
              1250<b> Br</b>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Favourite;
