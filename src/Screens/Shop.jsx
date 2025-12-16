// src/Screens/Shop.jsx
// ESLint FIX: Removed 'React' as it is not needed when using destructured hooks (useState, useEffect)
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../fb";
// ESLint FIX: Removed 'MdDiscount' as it is not used in the categories list
import { MdFace4, MdAutoFixNormal } from "react-icons/md";
import { TbPerfume } from "react-icons/tb";
import { PiHairDryerThin } from "react-icons/pi";
import { BiSearch } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
// import Heder from "../componenets/Header"; // Already removed in previous fix
import Carousel from "../componenets/Courasel";

const Shop = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
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
    { name: "Perfume", icon: <TbPerfume size={24} /> },
    { name: "Lotion", icon: <i className="fi fi-ss-react text-2xl"></i> },
    { name: "Facial", icon: <MdFace4 size={24} /> },
    { name: "Treatment", icon: <MdAutoFixNormal size={24} /> },
    { name: "Hair", icon: <PiHairDryerThin size={24} /> },
    { name: "More", icon: <BsThreeDots size={24} /> },
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
    <div className="flex flex-col">
      {/* Search and Filter Section */}
      <div className="flex items-center space-x-2 px-4 py-4 bg-white sticky top-0 z-10 shadow-sm">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow"
          />
          <BiSearch
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
        <button className="bg-[#d43790] p-3 rounded-full text-white hover:bg-pink-700 transition-colors">
          <FiFilter size={20} />
        </button>
      </div>

      {/* Carousel */}
      <div className="py-4 px-4 bg-white shadow-md">
        <Carousel />
      </div>

      {/* Categories Section */}
      <div className="flex overflow-x-scroll space-x-4 p-4 bg-white sticky z-10 custom-scrollbar-hide">
        {categories.map((cate) => (
          <div
            key={cate.name}
            className={`flex flex-col items-center p-2 rounded-lg transition-all text-sm font-medium whitespace-nowrap cursor-pointer ${
              selectedCategory === cate.name
                ? "bg-pink-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-pink-100"
            }`}
            onClick={() => handleCategoryClick(cate.name)}
          >
            <div className="text-2xl">{cate.icon}</div>
            <p className="mt-1">{cate.name}</p>
          </div>
        ))}
      </div>

      {/* Products Grid */}
      <div className="flex flex-col overflow-y-scroll pb-5">
        <div className="px-4 text-xl font-semibold columns-2 gap-4 mb-16">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl mb-4 cursor-pointer break-inside-avoid shadow-sm hover:shadow-lg transition-shadow"
              onClick={() => showItemDetail(item)}
            >
              <img
                src={
                  item.image
                    ? item.image
                    : "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg"
                }
                alt={item.name || "Product"}
                className="w-full h-40 object-cover rounded-2xl mb-2"
              />
              <div className="mt-2">
                <p className="font-bold tracking-normal truncate text-gray-800">
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
  );
};

export default Shop;
