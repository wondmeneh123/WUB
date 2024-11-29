import React, { useState } from "react";
import { Route, Routes, NavLink, useLocation } from "react-router-dom";
import "./components.css";
import { IoPersonSharp } from "react-icons/io5";
import Shop from "../Screens/Shop";
import { BiHome } from "react-icons/bi";
import { FaPlusCircle } from "react-icons/fa";
import Profile from "../Screens/Profile";
import Add from "../Screens/Add";
import ItemDetail from "../Screens/ItemDetail";
import App from "../App";

const BottomNavigation = () => {
  const [cart, setCart] = useState([]);
  const location = useLocation();

  return (
    <div className="bg-[#F5F5F0]">
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/add" element={<Add />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/profile" element={<Profile cart={cart} />} />
        </Routes>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-[#0f172a] shadow-lg border-t border-gray-200 z-50">
        <div className="flex justify-around p-3">
          <NavLink
            to="/shop"
            end
            className={`singleLink ${
              location.pathname === "/shop" ? "active" : ""
            }`}
          >
            <BiHome className="icon" size={20} />
            <p>Home</p>
          </NavLink>
          <NavLink
            to="/add"
            className={`singleLink ${
              location.pathname === "/add" ? "active" : ""
            }`}
          >
            <FaPlusCircle className="icon" size={20} />
            <p>Post Ad</p>
          </NavLink>
          <NavLink
            to="/profile"
            className={`singleLink ${
              location.pathname === "/profile" ? "active" : ""
            }`}
          >
            <IoPersonSharp className="icon" size={20} />
            <p>Account</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
