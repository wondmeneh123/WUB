import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../fb";
import { useNavigate } from "react-router-dom";

// Components
import Carousel from "../componenets/Courasel";
import SearchBar from "../componenets/SearchBar";
import CategoryList from "../componenets/CategoryList";

// Data & Icons
import { MdSort, MdClose } from "react-icons/md";
import { categoryData } from "../data/categories";
const Shop = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const navigate = useNavigate();

  // Fetch data from Firebase
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const itemsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(itemsList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchItems();
  }, []);

  // Category selection handler
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(
      categoryName === selectedCategory ? null : categoryName
    );
  };

  // Combined Filter and Sorting Logic
  const filteredItems = items
    .filter((item) => {
      const matchesCategory = selectedCategory
        ? item.category === selectedCategory
        : true;
      const matchesSearch = searchQuery
        ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOption === "priceLow") return a.price - b.price;
      if (sortOption === "priceHigh") return b.price - a.price;
      if (sortOption === "nameAZ") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="h-screen flex flex-col bg-[#FFF5F7] relative">
      <div className="mt-1 overflow-y-auto flex-1 no-scrollbar">
        {/* Search Bar & Filter Toggle */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onFilterClick={() => setIsFilterOpen(true)}
        />

        {/* Sorting Bottom Sheet (Modal) */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm transition-all">
            <div className="bg-white w-full rounded-t-[30px] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">
                  Sort Products
                </h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 bg-gray-100 rounded-full"
                >
                  <MdClose size={20} />
                </button>
              </div>

              <div className="space-y-3 pb-10">
                {[
                  { id: "latest", label: "Default (Latest)", icon: <MdSort /> },
                  { id: "priceLow", label: "Price: Low to High", icon: "💸" },
                  { id: "priceHigh", label: "Price: High to Low", icon: "💰" },
                  { id: "nameAZ", label: "Name: A to Z", icon: "🔤" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSortOption(option.id);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                      sortOption === option.id
                        ? "bg-[#d43790] text-white"
                        : "bg-gray-50 text-gray-700 hover:bg-pink-50"
                    }`}
                  >
                    <span className="text-xl">{option.icon}</span>
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Show Carousel and Categories only when NOT searching */}
        {!searchQuery && (
          <>
            <div className="px-4">
              <Carousel />
            </div>

            <CategoryList
              categories={categoryData}
              selectedCategory={selectedCategory}
              handleCategoryClick={handleCategoryClick}
            />
          </>
        )}

        {/* Product Grid Section */}
        <div className="flex flex-col pb-20">
          {filteredItems.length > 0 ? (
            <div className="px-4 mt-6 columns-2 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-3 rounded-[24px] mb-4 border border-pink-50 shadow-sm active:scale-95 transition-all break-inside-avoid"
                  onClick={() =>
                    navigate(`/item/${item.id}`, { state: { item } })
                  }
                >
                  <img
                    src={item.image || "https://via.placeholder.com/200"}
                    className="w-full rounded-[20px] aspect-square object-cover"
                    alt={item.name}
                  />
                  <div className="mt-3 px-1">
                    <p className="font-bold text-[13px] text-gray-800 truncate">
                      {item.name}
                    </p>
                    <p className="text-[#d43790] font-black mt-1">
                      ETB {item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20 text-gray-400">
              <p className="italic">No products found for this criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
