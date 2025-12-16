// src/componenets/BottomNavigation.jsx
import { useState } from "react";
import { Route, Routes, NavLink, useLocation } from "react-router-dom";
import "./components.css";
import { IoPersonSharp } from "react-icons/io5";
import { BiHome } from "react-icons/bi";
import { FaPlusCircle } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
// Import all necessary screen/page components
import Shop from "../Screens/Shop";
import Profile from "../Screens/Profile";
import Add from "../Screens/Add";
import ItemDetail from "../Screens/ItemDetail";
import Cart from "../Screens/Cart"; // Ensure this is imported
import Header from "./Header";
import Notification from "../Screens/Cart";

const BottomNavigation = () => {
  const [cart, setCart] = useState([]);
  const location = useLocation();

  // 1. Add to Cart Function
  const addToCart = (itemToAdd) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === itemToAdd.id
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      } else {
        return [...prevCart, { ...itemToAdd, quantity: 1 }];
      }
    });
  };

  // 2. Update Cart Quantity Function (New)
  const updateCartQuantity = (itemId, change) => {
    setCart((prevCart) => {
      const newCart = prevCart.map((item) => {
        if (item.id === itemId) {
          // Ensure quantity is never less than 1
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      return newCart;
    });
  };

  // 3. Remove From Cart Function (New)
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="bg-[#FFF5F7]">
      <Header />

      <div className="flex-1">
        <Routes>
          <Route path="/shop" element={<Shop />} />
          <Route path="/add" element={<Add />} />
          <Route
            path="/item/:id"
            element={<ItemDetail addToCart={addToCart} />}
          />
          <Route path="/profile" element={<Profile cart={cart} />} />

          {/* FIX: Pass new cart functions to Cart component */}
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                updateCartQuantity={updateCartQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />

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

          {/* Cart Link with Badge */}
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
