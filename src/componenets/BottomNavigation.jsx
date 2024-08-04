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

const BottomNavigation = () => {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <div className="app bg-[#F5F5F0]">
        <Routes>
          <Route path="/" element={<Shop cart={cart} setCart={setCart} />} />
          <Route path="/add" element={<Add />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/cart" element={<Cart cart={cart} />} />
        </Routes>
        <div className="links">
          <NavLink to="/" end className="singleLink" activeClassName="active">
            <BiHome className="icon" size={20} />
            <p>Home</p>
          </NavLink>
          <NavLink to="/add" className="singleLink" activeClassName="active">
            <FaPlusCircle className="icon" size={20} />
            <p>Post Ad</p>
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
