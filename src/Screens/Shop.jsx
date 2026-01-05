import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../fb";
import { useNavigate } from "react-router-dom";

// Components
import Carousel from "../componenets/Courasel";
import SearchBar from "../componenets/SearchBar";
import CategoryList from "../componenets/CategoryList";
import SortModal from "../componenets/SortModal";

// Data
import { categoryData } from "../data/categories";

const Shop = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const navigate = useNavigate();

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

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(
      categoryName === selectedCategory ? null : categoryName
    );
  };

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
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onFilterClick={() => setIsFilterOpen(true)}
        />

        {isFilterOpen && (
          <SortModal
            sortOption={sortOption}
            setSortOption={setSortOption}
            setIsFilterOpen={setIsFilterOpen}
          />
        )}

        {!searchQuery && (
          <>
            <div className="px-4">
              <Carousel />
            </div>
            {/* (Promo Banner)*/}
            <div className="px-4 mt-4">
              <img
                src="https://img.freepik.com/free-vector/flat-beauty-sale-banner-template-with-photo_23-2149504494.jpg"
                alt="Promo"
                className="w-full h-32 object-cover rounded-[20px] shadow-sm border border-pink-100"
              />
            </div>

            <CategoryList
              categories={categoryData}
              selectedCategory={selectedCategory}
              handleCategoryClick={handleCategoryClick}
            />
          </>
        )}

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
            /*  (Empty State Image) */
            <div className="flex flex-col items-center justify-center py-20 px-10 text-center">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/not-found-illustration-download-in-svg-png-gif-file-formats--search-error-404-empty-state-pack-user-interface-illustrations-5218628.png"
                alt="Not Found"
                className="w-48 h-48 object-contain mb-4 opacity-80"
              />
              <p className="text-gray-400 italic font-medium">
                Oops! No products found for this criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
