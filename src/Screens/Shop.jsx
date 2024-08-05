import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../fb"; // Adjust the import path as necessary
import { MdDiscount } from "react-icons/md";
import { MdFace4 } from "react-icons/md";
import { TbPerfume } from "react-icons/tb";
import { MdAutoFixNormal } from "react-icons/md";
import { PiHairDryerThin } from "react-icons/pi";
import { BiSearch } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
// import Header from "../components/Header";

const Shop = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const itemsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(itemsList);
    };

    fetchItems();
  }, []);

  const categories = [
    { name: "Perfume", icon: <TbPerfume /> },
    { name: "Lotion", icon: <i className="fi fi-ss-react"></i> },
    { name: "Facial", icon: <MdFace4 /> },
    { name: "Treatment", icon: <MdAutoFixNormal /> },
    { name: "Hair", icon: <PiHairDryerThin /> },
    { name: "Others", icon: <BsThreeDots /> },
  ];

  const showItemDetail = (item) => {
    navigate(`/item/${item.id}`, { state: { item } });
  };

  return (
    <div className="h-screen flex flex-col">
      {/* <Header /> */}
      <div className="mt-1 overflow-y-auto flex-1">
        <div className="flex items-center justify-between gap-3 px-5">
          <div className="flex bg-white items-center w-full p-2 rounded-2xl">
            <BiSearch size={20} />
            <input
              type="text"
              className="ml-2 w-full"
              placeholder="Search..."
            />
          </div>
          <div className="p-3 rounded-full active:border-0 active:border-white">
            <FiFilter size={20} />
          </div>
        </div>
        <div className="flex p-4 m-4 bg-[#d43790] justify-around rounded-2xl text-white items-center">
          <div className="flex flex-col">
            <p>Men's Fashion Collection</p>
            <p>Discount up to 60%</p>
          </div>
          <MdDiscount size={50} color="#fff" />
        </div>
        <div className="flex overflow-x-scroll gap-2 px-4 text-sm my-2 justify-center">
          {categories.map((cate) => (
            <div
              key={cate.name}
              className="bg-white px-2 py-1 rounded-xl flex flex-col justify-center items-center cursor-pointer"
            >
              {cate.icon}
              {cate.name}
            </div>
          ))}
        </div>
        <div className="flex flex-col overflow-y-scroll">
          <div className="px-4 text-xl font-semibold columns-2 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl mb-4 cursor-pointer break-inside-avoid"
                onClick={() => showItemDetail(item)}
              >
                <img
                  src={item.image}
                  width={200}
                  alt={item.name}
                  className="w-full rounded-2xl cursor-pointer"
                />
                <div className="mt-2">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm text-gray-500 truncate">
                    {item.description}
                  </p>

                  <p className="text-lg font-semibold text-[#d43790]">
                    {item.price} Br
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
