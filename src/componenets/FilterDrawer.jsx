import PropTypes from "prop-types";
import { MdClose, MdRestartAlt } from "react-icons/md";

const FilterDrawer = ({ setIsFilterOpen }) => {
  // Data arrays for filter options
  const brands = [
    "Gucci",
    "CeraVe",
    "MAC",
    "The Ordinary",
    "Neutrogena",
    "OPI",
  ];
  const categories = ["Perfume", "Facial", "Makeup", "Hair Care", "Body Care"];

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* BACKDROP: Semi-transparent background 
          Closes the drawer when clicked
      */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => setIsFilterOpen(false)}
      ></div>

      {/* DRAWER CONTENT: Slides in from the right 
          Width is set to 85% on mobile, max 320px
      */}
      <div className="relative w-[85%] max-w-[320px] h-full bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        {/* HEADER SECTION: Title and Reset button */}
        <div className="p-5 flex justify-between items-center border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-black text-gray-800 uppercase tracking-tighter">
              Filter
            </h3>
            <button className="text-[#d43790] text-[10px] font-bold flex items-center gap-1 bg-pink-50 px-2 py-0.5 rounded-full hover:bg-pink-100 transition-colors">
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

        {/* SCROLLABLE CONTENT: All filter groups go here */}
        <div className="flex-1 overflow-y-auto p-5 space-y-8 no-scrollbar">
          {/* 1. PRICE RANGE: Min and Max numeric inputs */}
          <section>
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
              Price (ETB)
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Min"
                className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-pink-200 outline-none transition-all"
              />
              <input
                type="number"
                placeholder="Max"
                className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-pink-200 outline-none transition-all"
              />
            </div>
          </section>

          {/* 2. BRANDS: Multi-select checkboxes */}
          <section>
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
              Popular Brands
            </h4>
            <div className="space-y-4">
              {brands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center group cursor-pointer"
                >
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-200 checked:bg-[#d43790] checked:border-[#d43790] transition-all"
                    />
                    {/* SVG checkmark that appears only when input is checked */}
                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                  <span className="ml-3 text-sm font-bold text-gray-600 group-hover:text-black transition-colors">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* 3. CATEGORIES: Additional multi-select options */}
          <section>
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
              Categories
            </h4>
            <div className="space-y-4">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center group cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded-md border-gray-200 text-[#d43790] focus:ring-[#d43790] cursor-pointer"
                  />
                  <span className="ml-3 text-sm font-bold text-gray-600 group-hover:text-black transition-colors">
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* FOOTER: Fixed button to apply filters */}
        <div className="p-5 border-t border-gray-50 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          <button
            onClick={() => setIsFilterOpen(false)}
            className="w-full bg-[#d43790] text-white font-black py-4 rounded-[20px] shadow-lg shadow-pink-100 active:scale-95 transition-all"
          >
            SHOW RESULTS
          </button>
        </div>
      </div>
    </div>
  );
};

// Defining PropTypes for component safety
FilterDrawer.propTypes = {
  setIsFilterOpen: PropTypes.func.isRequired,
};

export default FilterDrawer;
