import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../fb";
import { useNavigate } from "react-router-dom";

// Components
import Carousel from "../componenets/Courasel";
import SearchBar from "../componenets/SearchBar";
import CategoryList from "../componenets/CategoryList";
import FilterDrawer from "../componenets/FilterDrawer";

// Data
import { categoryData } from "../data/categories";
import { sampleItems } from "../data/sampleProducts";
import PromoBanner from "../data/PromoBanner";

const Shop = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const navigate = useNavigate();

  // 1. FILTERS STATE
  const [filters, setFilters] = useState({
    sort: "latest",
    minPrice: 0,
    maxPrice: Infinity,
    brands: [],
    categories: [],
    location: "",
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const firebaseItems = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Merge sample data with Firebase data
        setItems([...sampleItems, ...firebaseItems]);
      } catch (error) {
        console.error("Error fetching products:", error);
        setItems(sampleItems);
      }
    };
    fetchItems();
  }, []);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(
      categoryName === selectedCategory ? null : categoryName
    );
  };

  // 2. FILTERING LOGIC
  const filteredItems = items
    .filter((item) => {
      // Search Filter
      const matchesSearch = searchQuery
        ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      // Category Filter (Prioritize Drawer selection, then top category list)
      const drawerCats = filters.categories;
      const matchesCategory =
        drawerCats.length > 0
          ? drawerCats.includes(item.category)
          : selectedCategory
          ? item.category === selectedCategory
          : true;

      // Price Filter
      const matchesPrice =
        item.price >= filters.minPrice && item.price <= filters.maxPrice;

      // Brand Filter
      const matchesBrand =
        filters.brands.length > 0 ? filters.brands.includes(item.brand) : true;

      // Location Filter
      const matchesLocation = filters.location
        ? item.city === filters.location
        : true;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesBrand &&
        matchesLocation
      );
    })
    .sort((a, b) => {
      if (filters.sort === "priceLow") return a.price - b.price;
      if (filters.sort === "priceHigh") return b.price - a.price;
      if (filters.sort === "nameAZ") return a.name.localeCompare(b.name);
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

        {/* 3. UPDATED: Passing 'items' as 'allProducts' for dynamic counts */}
        {isFilterOpen && (
          <FilterDrawer
            setIsFilterOpen={setIsFilterOpen}
            currentFilters={filters}
            onApplyFilters={setFilters}
            allProducts={items}
          />
        )}

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

        <div className="flex flex-col pb-10">
          {filteredItems.length > 0 ? (
            <>
              <div className="px-4 mt-6 columns-2 gap-4">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-3 rounded-[24px] mb-4 border border-pink-50 shadow-sm active:scale-95 transition-all break-inside-avoid cursor-pointer"
                    onClick={() =>
                      navigate(`/item/${item.id}`, {
                        state: { item, allItems: items },
                      })
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
                      <p className="text-[10px] text-gray-400 font-bold uppercase truncate">
                        {item.city || "Addis Ababa"}
                      </p>
                      <p className="text-[#d43790] font-black mt-1 text-sm">
                        ETB {item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {!searchQuery && <PromoBanner />}
            </>
          ) : (
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
