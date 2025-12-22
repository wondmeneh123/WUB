// src/componenets/BottomNavigation.jsx
import { Route, Routes, NavLink } from "react-router-dom"; // useLocation ተወግዷል
import PropTypes from "prop-types";
import "./components.css";
import { IoPersonSharp } from "react-icons/io5";
import { BiHome } from "react-icons/bi";
import { FaPlusCircle } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";

import Shop from "../Screens/Shop";
import Profile from "../Screens/Profile";
import Add from "../Screens/Add";
import ItemDetail from "../Screens/ItemDetail";
import Cart from "../Screens/Cart";
import Header from "./Header";
import Notifications from "../Screens/Notifications";

const BottomNavigation = ({ cart, setCart }) => {
  // const location = useLocation(); // ይህ መስመር ተወግዷል

  const addToCart = (itemToAdd) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === itemToAdd.id
      );
      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      }
      return [...prevCart, { ...itemToAdd, quantity: 1 }];
    });
  };

  const updateCartQuantity = (itemId, change) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="bg-[#FFF5F7]">
      <Header />
      <div className="flex-1 pb-20">
        {" "}
        {/* ከታች ማርጂን እንዲኖረው pb-20 ጨምሬበታለሁ */}
        <Routes>
          <Route path="/shop" element={<Shop />} />
          <Route path="/add" element={<Add />} />
          <Route
            path="/item/:id"
            element={<ItemDetail addToCart={addToCart} />}
          />
          <Route path="/profile" element={<Profile cart={cart} />} />
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
          <Route
            path="/notifications"
            element={<Notifications cart={cart} />}
          />
          <Route path="/" element={<Shop />} />
        </Routes>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#FFEBEE] shadow-lg border-t border-pink-200 z-50">
        <div className="flex justify-around p-4">
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `flex flex-col items-center ${
                isActive ? "text-pink-600" : "text-gray-500"
              }`
            }
          >
            <BiHome size={24} />
            <p className="text-xs mt-1">Home</p>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `flex flex-col items-center relative ${
                isActive ? "text-pink-600" : "text-gray-500"
              }`
            }
          >
            <MdOutlineShoppingCart size={24} />
            {totalCartItems > 0 && (
              <span className="absolute top-[-4px] right-[-10px] bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
            <p className="text-xs mt-1">Cart</p>
          </NavLink>

          <NavLink
            to="/add"
            className={({ isActive }) =>
              `flex flex-col items-center ${
                isActive ? "text-pink-600" : "text-gray-500"
              }`
            }
          >
            <FaPlusCircle size={24} />
            <p className="text-xs mt-1">Post Ad</p>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex flex-col items-center ${
                isActive ? "text-pink-600" : "text-gray-500"
              }`
            }
          >
            <IoPersonSharp size={24} />
            <p className="text-xs mt-1">Profile</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

BottomNavigation.propTypes = {
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
};

export default BottomNavigation;
