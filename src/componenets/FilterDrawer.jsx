import PropTypes from "prop-types";
import { useState } from "react";
import {
  MdClose,
  MdRestartAlt,
  MdCheck,
  MdLocationOn,
  MdKeyboardArrowDown,
} from "react-icons/md";

const FilterDrawer = ({ setIsFilterOpen, currentFilters, onApplyFilters }) => {
  // 1. DATA WITH COUNTS (Jiji Style)
  const brands = [
    { name: "Gucci", count: 12 },
    { name: "CeraVe", count: 45 },
    { name: "MAC", count: 28 },
    { name: "The Ordinary", count: 33 },
    { name: "Neutrogena", count: 19 },
    { name: "OPI", count: 14 },
  ];

  const categories = [
    { name: "Perfume", count: 120 },
    { name: "Facial", count: 85 },
    { name: "Makeup", count: 210 },
    { name: "Hair Care", count: 64 },
    { name: "Body Care", count: 92 },
  ];

  const locations = [
    "Addis Ababa",
    "Bishoftu",
    "Adama",
    "Hawassa",
    "Bahir Dar",
  ];

  const sortOptions = [
    { id: "latest", label: "Latest" },
    { id: "priceLow", label: "Price: Low to High" },
    { id: "priceHigh", label: "Price: High to Low" },
    { id: "nameAZ", label: "Name: A to Z" },
  ];

  // 2. LOCAL STATE
  const [tempSort, setTempSort] = useState(currentFilters?.sort || "latest");
  const [minPrice, setMinPrice] = useState(currentFilters?.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(currentFilters?.maxPrice || "");
  const [selectedBrands, setSelectedBrands] = useState(
    currentFilters?.brands || []
  );
  const [selectedCats, setSelectedCats] = useState(
    currentFilters?.categories || []
  );
  const [selectedLocation, setSelectedLocation] = useState(
    currentFilters?.location || ""
  );

  const toggleItem = (list, setList, item) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleReset = () => {
    setTempSort("latest");
    setMinPrice("");
    setMaxPrice("");
    setSelectedBrands([]);
    setSelectedCats([]);
    setSelectedLocation("");
  };

  const handleApply = () => {
    onApplyFilters({
      sort: tempSort,
      minPrice: parseFloat(minPrice) || 0,
      maxPrice: parseFloat(maxPrice) || Infinity,
      brands: selectedBrands,
      categories: selectedCats,
      location: selectedLocation,
    });
    setIsFilterOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsFilterOpen(false)}
      ></div>

      <div className="relative w-[85%] max-w-[340px] h-full bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        {/* HEADER */}
        <div className="p-5 flex justify-between items-center border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-black text-gray-800 uppercase">
              Filters
            </h3>
            <button
              onClick={handleReset}
              className="text-[#d43790] text-[10px] font-bold flex items-center gap-1 bg-pink-50 px-2 py-0.5 rounded-full"
            >
              <MdRestartAlt /> RESET
            </button>
          </div>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="text-gray-400"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-5 space-y-8 no-scrollbar pb-24">
          {/* LOCATION SECTION (Option Style) */}
          <section>
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-1">
              <MdLocationOn className="text-pink-500" /> Location
            </h4>
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm font-bold text-gray-700 appearance-none focus:ring-2 focus:ring-pink-100 outline-none"
              >
                <option value="">All over Ethiopia</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <MdKeyboardArrowDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                size={20}
              />
            </div>
          </section>

          {/* SORT SECTION (Visual Tags/Pills) */}
          <section>
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">
              Sort By
            </h4>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setTempSort(opt.id)}
                  className={`px-4 py-2 rounded-full text-[11px] font-bold transition-all border ${
                    tempSort === opt.id
                      ? "bg-gray-900 border-gray-900 text-white"
                      : "bg-white border-gray-200 text-gray-500"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          {/* PRICE RANGE */}
          <section>
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">
              Price Range (ETB)
            </h4>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min"
                className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-pink-100 outline-none"
              />
              <span className="text-gray-300">—</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max"
                className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-pink-100 outline-none"
              />
            </div>
          </section>

          {/* BRANDS (Visual Tags with Check) */}
          <section>
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">
              Popular Brands
            </h4>
            <div className="flex flex-wrap gap-2">
              {brands.map((brand) => (
                <button
                  key={brand.name}
                  onClick={() =>
                    toggleItem(selectedBrands, setSelectedBrands, brand.name)
                  }
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${
                    selectedBrands.includes(brand.name)
                      ? "bg-pink-50 border-pink-200 text-[#d43790]"
                      : "bg-white border-gray-100 text-gray-600"
                  }`}
                >
                  <span className="text-xs font-bold">{brand.name}</span>
                  <span
                    className={`text-[9px] px-1.5 rounded-md ${
                      selectedBrands.includes(brand.name)
                        ? "bg-pink-200 text-pink-700"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {brand.count}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* CATEGORIES (Jiji Style List) */}
          <section>
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">
              Categories
            </h4>
            <div className="space-y-1">
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  onClick={() =>
                    toggleItem(selectedCats, setSelectedCats, cat.name)
                  }
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-5 w-5 rounded border flex items-center justify-center transition-all ${
                        selectedCats.includes(cat.name)
                          ? "bg-[#d43790] border-[#d43790]"
                          : "border-gray-200"
                      }`}
                    >
                      {selectedCats.includes(cat.name) && (
                        <MdCheck className="text-white text-xs" />
                      )}
                    </div>
                    <span
                      className={`text-sm font-bold ${
                        selectedCats.includes(cat.name)
                          ? "text-black"
                          : "text-gray-600"
                      }`}
                    >
                      {cat.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                    {cat.count}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-gray-50 bg-white/80 backdrop-blur-md">
          <button
            onClick={handleApply}
            className="w-full bg-[#d43790] text-white font-black py-4 rounded-2xl shadow-lg shadow-pink-100 active:scale-95 transition-all uppercase tracking-widest"
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
