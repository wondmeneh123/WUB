import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../fb"; // Adjust the import path as necessary
import { MdDiscount, MdFace4, MdAutoFixNormal } from "react-icons/md";
import { TbPerfume } from "react-icons/tb";
import { PiHairDryerThin } from "react-icons/pi";
import { BiSearch } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import Heder from "../componenets/Header";
import Carousel from "../componenets/Courasel";

const Shop = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
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
  ];

  // Filter items based on selected category and search query
  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory
      ? item.category === selectedCategory
      : true;
    const matchesSearch = searchQuery
      ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  const showItemDetail = (item) => {
    navigate(`/item/${item.id}`, { state: { item } });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="h-screen flex flex-col">
      <Heder />
      <div className="mt-1 overflow-y-auto flex-1">
        <div className="flex items-center justify-between gap-3 px-5 my-6">
          <div className="flex bg-white items-center w-full p-2 rounded-2xl">
            <BiSearch size={20} />
            <input
              type="text"
              className="ml-2 w-full focus:border-transparent focus:outline-none"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="p-3 rounded-full active:border-0 active:border-white bg-[#d43790] text-white">
            <FiFilter size={20} />
          </div>
        </div>
        <div className="px-4">
          <Carousel />
        </div>
        <div className="flex overflow-x-scroll gap-2 px-4 text-sm my-2 justify-around">
          {categories.map((cate) => (
            <div
              key={cate.name}
              className={`px-2 py-1 rounded-xl flex flex-col justify-center items-center cursor-pointer transition-all ${
                selectedCategory === cate.name
                  ? "bg-purple-500 text-white scale-105 shadow-lg"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => handleCategoryClick(cate.name)}
            >
              <div className="text-2xl">{cate.icon}</div>
              <p>{cate.name}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col overflow-y-scroll pb-5">
          <div className="px-4 text-xl font-semibold columns-2 gap-4 mb-16">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl mb-4 cursor-pointer break-inside-avoid"
                onClick={() => showItemDetail(item)}
              >
                <img
                  width={200}
                  src={
                    item.image
                      ? item.image
                      : "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg"
                  }
                  height={200}
                  alt={item.name || "Product"}
                  className="w-full w rounded-2xl cursor-pointer"
                />
                <div className="mt-2">
                  <p className="font-bold tracking-normal truncate">
                    {item.name}
                  </p>
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
