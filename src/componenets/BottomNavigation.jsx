import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import "./components.css";
import { CiWallet } from "react-icons/ci";

import { FaCarTunnel, FaMoneyBill1Wave } from "react-icons/fa6";
import { IoIosSwap } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";
import { IoPersonSharp } from "react-icons/io5";
import Favourite from "../Screens/Favourite";
import { BiCart, BiHeart, BiHome } from "react-icons/bi";

const BottomNavigation = () => {
  const Wallet = () => {
    return <h1 className="text-white text-2xl">Hello</h1>;
  };
  return (
    <Router>
      <div className="app bg-[#F5F5F0]">
        <Routes>
          <Route path="/" element={<Favourite />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/favourite" element={<Wallet />} />
          <Route path="/favourite" element={<Wallet />} />
          <Route path="/favourite" element={<Wallet />} />
          <Route path="/favourite" element={<Wallet />} />
          <Route path="/favourite" element={<Wallet />} />
        </Routes>
        <div className="links">
          <NavLink to="/" end className="singleLink" activeClassName="active">
            <BiHome className="icon" size={20} />
            <p>Home</p>
          </NavLink>
          <NavLink
            to="/favourite"
            className="singleLink"
            activeClassName="active"
          >
            <BiHeart className="icon" size={20} />
            <p>Favourite</p>
          </NavLink>
          <NavLink to="/create" className="singleLink" activeClassName="active">
            <BiCart className="icon" size={20} />
            <p>Cart</p>
          </NavLink>

          <NavLink
            to="/account"
            className="singleLink"
            activeClassName="active"
          >
            <IoPersonSharp className="icon" size={20} />
            <p>Acccount</p>
          </NavLink>
        </div>
      </div>
    </Router>
  );
};

export default BottomNavigation;
