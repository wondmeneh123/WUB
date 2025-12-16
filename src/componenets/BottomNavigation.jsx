import { useState } from "react";
import { Route, Routes, NavLink, useLocation } from "react-router-dom";
import "./components.css"; // FIX: Corrected path from previous error
import { IoPersonSharp } from "react-icons/io5";
import { BiHome } from "react-icons/bi";
import { FaPlusCircle } from "react-icons/fa";
// Import all necessary screen/page components
import Shop from "../Screens/Shop";
import Profile from "../Screens/Profile";
import Add from "../Screens/Add";
import ItemDetail from "../Screens/ItemDetail";
import Cart from "../Screens/Cart";
import Header from "./Header";
import Notification from "../Screens/Cart"; // Using Cart temporarily for Notifications route

const BottomNavigation = () => {
  const [cart] = useState([]);
  const location = useLocation();

  return (
    <div className="bg-[#FFF5F7]">
      {/* Header is placed here, outside of Routes, to be static across all pages */}
      <Header />

      {/* Main Content Area - Routes */}
      <div className="flex-1">
        <Routes>
          <Route path="/shop" element={<Shop />} />
          <Route path="/add" element={<Add />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/profile" element={<Profile cart={cart} />} />
          {/* New Routes for Cart and Notifications */}
          <Route path="/cart" element={<Cart cart={cart} />} />
          <Route path="/notifications" element={<Notification cart={cart} />} />
          {/* Default route redirects to /shop */}
          <Route path="/" element={<Shop />} />
        </Routes>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#FFEBEE] shadow-lg border-t border-pink-200 z-50">
        <div className="flex justify-around p-4">
          {/* Home Link */}
          <NavLink
            to="/shop"
            end
            className={`flex flex-col items-center text-gray-500 ${
              location.pathname === "/shop" ? "text-pink-600" : ""
            }`}
          >
            <BiHome size={24} />
            <p className="text-xs mt-1">Home</p>
          </NavLink>

          {/* Add Link */}
          <NavLink
            to="/add"
            className={`flex flex-col items-center text-gray-500 ${
              location.pathname === "/add" ? "text-pink-600" : ""
            }`}
          >
            <FaPlusCircle size={24} />
            <p className="text-xs mt-1">Post Ad</p>
          </NavLink>

          {/* Profile Link */}
          <NavLink
            to="/profile"
            className={`flex flex-col items-center text-gray-500 ${
              location.pathname === "/profile" ? "text-pink-600" : ""
            }`}
          >
            <IoPersonSharp size={24} />
            <p className="text-xs mt-1">Profile</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
