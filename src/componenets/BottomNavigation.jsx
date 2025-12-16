// src/componenets/BottomNavigation.jsx
import { useState } from "react";
import { Route, Routes, NavLink, useLocation } from "react-router-dom";
import "./components.css";
import { IoPersonSharp } from "react-icons/io5";
import { BiHome } from "react-icons/bi";
import { FaPlusCircle } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md"; // Added Cart Icon
// Import all necessary screen/page components
import Shop from "../Screens/Shop";
import Profile from "../Screens/Profile";
import Add from "../Screens/Add";
import ItemDetail from "../Screens/ItemDetail";
import Cart from "../Screens/Cart";
import Header from "./Header";
import Notification from "../Screens/Cart";

const BottomNavigation = () => {
  // 1. FIX: Cart State is now mutable
  const [cart, setCart] = useState([]);
  const location = useLocation();

  // 2. Add to Cart Function
  const addToCart = (itemToAdd) => {
    setCart((prevCart) => {
      // Check if the item is already in the cart
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === itemToAdd.id
      );

      if (existingItemIndex > -1) {
        // If it exists, increase the quantity
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      } else {
        // If it's new, add it with a quantity of 1
        return [...prevCart, { ...itemToAdd, quantity: 1 }];
      }
    });
    // Optional: Provide feedback to the user
    // alert(`${itemToAdd.name} has been added to the cart!`);
  };

  // Calculate total number of items in the cart for the badge
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="bg-[#FFF5F7]">
      {/* Header is placed here, outside of Routes, to be static across all pages */}
      <Header />

      {/* Main Content Area - Routes */}
      <div className="flex-1">
        <Routes>
          <Route path="/shop" element={<Shop />} />
          <Route path="/add" element={<Add />} />
          {/* 3. FIX: Pass addToCart function to ItemDetail */}
          <Route
            path="/item/:id"
            element={<ItemDetail addToCart={addToCart} />}
          />
          <Route path="/profile" element={<Profile cart={cart} />} />
          <Route path="/cart" element={<Cart cart={cart} />} />
          <Route path="/notifications" element={<Notification cart={cart} />} />
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

          {/* Cart Link (FIX: Added Cart Navlink with Badge) */}
          <NavLink
            to="/cart"
            className={`flex flex-col items-center text-gray-500 relative ${
              location.pathname === "/cart" ? "text-pink-600" : ""
            }`}
          >
            <MdOutlineShoppingCart size={24} />
            {/* Cart Count Badge */}
            {totalCartItems > 0 && (
              <span className="absolute top-[-4px] right-[-10px] bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ring-2 ring-[#FFEBEE]">
                {totalCartItems}
              </span>
            )}
            <p className="text-xs mt-1">Cart</p>
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
