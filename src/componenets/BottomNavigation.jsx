import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import "./components.css";
import { IoPersonSharp } from "react-icons/io5";
import Shop from "../Screens/Shop";
import { BiCart, BiHeart, BiHome } from "react-icons/bi";
import { FaPlusCircle } from "react-icons/fa";
import Cart from "../Screens/Cart";
import Add from "../Screens/Add";
import ItemDetail from "../Screens/ItemDetail";
import Profile from "../Screens/Profile";
import { Auth } from "../Screens/Auth";

const BottomNavigation = () => {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <div className="bg-[#F5F5F0]">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/product" element={<Shop />} />
            <Route path="/add" element={<Add />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/profile" element={<Profile cart={cart} />} />
          </Routes>
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-[#0f172a] shadow-lg border-t border-gray-200 z-50">
          <div className="flex justify-around p-3">
            <NavLink to="/" end className="singleLink" activeClassName="active">
              <BiHome className="icon" size={20} />
              <p>Home</p>
            </NavLink>
            <NavLink to="/add" className="singleLink" activeClassName="active">
              <FaPlusCircle className="icon" size={20} />
              <p>Post Ad</p>
            </NavLink>
            <NavLink
              to="/profile"
              className="singleLink"
              activeClassName="active"
            >
              <IoPersonSharp className="icon" size={20} />
              <p>Account</p>
            </NavLink>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default BottomNavigation;
