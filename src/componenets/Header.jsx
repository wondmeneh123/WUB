import React from "react";
import { HiMiniBellAlert } from "react-icons/hi2";
const Header = () => {
  return (
    <div className="text-[#111] flex justify-between px-3 py-3 shadow-md">
      <p className="font-bold text-xl">WUB</p>
      <HiMiniBellAlert size={30} />
    </div>
  );
};

export default Header;
