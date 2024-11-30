import React from "react";
import { HiMiniBellAlert } from "react-icons/hi2";
import { FiShoppingCart, FiUser } from "react-icons/fi";

const Header = () => {
  return (
    <div className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 justify-center">
          <p className="font-extrabold text-2xl text-indigo-600 tracking-wide text-center">
            WUB<span className="text-gray-800">Mart</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
