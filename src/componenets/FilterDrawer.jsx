import PropTypes from "prop-types";
import { useState } from "react";
import { MdClose, MdRestartAlt, MdCheck } from "react-icons/md";

const FilterDrawer = ({ setIsFilterOpen, currentFilters, onApplyFilters }) => {
  // 1. DATA ARRAYS
  const brands = [
    "Gucci",
    "CeraVe",
    "MAC",
    "The Ordinary",
    "Neutrogena",
    "OPI",
  ];
  const categories = ["Perfume", "Facial", "Makeup", "Hair Care", "Body Care"];
  const sortOptions = [
    { id: "latest", label: "Latest" },
    { id: "priceLow", label: "Price: Low to High" },
    { id: "priceHigh", label: "Price: High to Low" },
    { id: "nameAZ", label: "Name: A to Z" },
  ];

  // 2. LOCAL STATE: Sync with current filters or set defaults
  const [tempSort, setTempSort] = useState(currentFilters?.sort || "latest");
  const [minPrice, setMinPrice] = useState(currentFilters?.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(currentFilters?.maxPrice || "");
  const [selectedBrands, setSelectedBrands] = useState(
    currentFilters?.brands || []
  );
  const [selectedCats, setSelectedCats] = useState(
    currentFilters?.categories || []
  );

  // Toggle Checkbox Logic
  const toggleItem = (list, setList, item) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // Reset all fields
  const handleReset = () => {
    setTempSort("latest");
    setMinPrice("");
    setMaxPrice("");
    setSelectedBrands([]);
    setSelectedCats([]);
  };

  // Send data back to Shop.jsx
  const handleApply = () => {
    onApplyFilters({
      sort: tempSort,
      minPrice: parseFloat(minPrice) || 0,
      maxPrice: parseFloat(maxPrice) || Infinity,
      brands: selectedBrands,
      categories: selectedCats,
    });
    setIsFilterOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => setIsFilterOpen(false)}
      ></div>

      <div className="relative w-[85%] max-w-[320px] h-full bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        {/* HEADER */}
        <div className="p-5 flex justify-between items-center border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-black text-gray-800 uppercase tracking-tighter">
              Filter & Sort
            </h3>
            <button
              onClick={handleReset}
              className="text-[#d43790] text-[10px] font-bold flex items-center gap-1 bg-pink-50 px-2 py-0.5 rounded-full hover:bg-pink-100 transition-colors"
            >
              <MdRestartAlt /> RESET
            </button>
          </div>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="p-1 text-gray-400 hover:text-black transition-colors"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-5 space-y-8 no-scrollbar">
          {/* SORT SECTION */}
          <section>
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
              Sort By
            </h4>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setTempSort(opt.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    tempSort === opt.id
                      ? "bg-[#d43790] text-white shadow-md shadow-pink-100"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          {/* PRICE RANGE */}
          <section>
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
              Price (ETB)
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min"
                className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-pink-200 outline-none"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max"
                className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-pink-200 outline-none"
              />
            </div>
          </section>

          {/* BRANDS */}
          <section>
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
              Popular Brands
            </h4>
            <div className="space-y-3">
              {brands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center group cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleItem(selectedBrands, setSelectedBrands, brand);
                  }}
                >
                  <div
                    className={`h-5 w-5 rounded-md border flex items-center justify-center transition-all ${
                      selectedBrands.includes(brand)
                        ? "bg-[#d43790] border-[#d43790]"
                        : "border-gray-200"
                    }`}
                  >
                    {selectedBrands.includes(brand) && (
                      <MdCheck className="text-white text-xs" />
                    )}
                  </div>
                  <span
                    className={`ml-3 text-sm font-bold transition-colors ${
                      selectedBrands.includes(brand)
                        ? "text-black"
                        : "text-gray-500"
                    }`}
                  >
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* CATEGORIES */}
          <section>
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
              Categories
            </h4>
            <div className="space-y-3">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center group cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleItem(selectedCats, setSelectedCats, cat);
                  }}
                >
                  <div
                    className={`h-5 w-5 rounded-md border flex items-center justify-center transition-all ${
                      selectedCats.includes(cat)
                        ? "bg-[#d43790] border-[#d43790]"
                        : "border-gray-200"
                    }`}
                  >
                    {selectedCats.includes(cat) && (
                      <MdCheck className="text-white text-xs" />
                    )}
                  </div>
                  <span
                    className={`ml-3 text-sm font-bold transition-colors ${
                      selectedCats.includes(cat)
                        ? "text-black"
                        : "text-gray-500"
                    }`}
                  >
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <div className="p-5 border-t border-gray-50 bg-white">
          <button
            onClick={handleApply}
            className="w-full bg-[#d43790] text-white font-black py-4 rounded-[20px] shadow-lg shadow-pink-100 active:scale-95 transition-all uppercase tracking-widest"
          >
            Show Results
          </button>
        </div>
      </div>
    </div>
  );
};

FilterDrawer.propTypes = {
  setIsFilterOpen: PropTypes.func.isRequired,
  currentFilters: PropTypes.object,
  onApplyFilters: PropTypes.func.isRequired,
};

export default FilterDrawer;
