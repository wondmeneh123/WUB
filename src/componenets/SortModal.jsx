import PropTypes from "prop-types";
import {
  MdClose,
  MdSort,
  MdTrendingDown,
  MdTrendingUp,
  MdTextFields,
} from "react-icons/md";

const SortModal = ({ sortOption, setSortOption, setIsFilterOpen }) => {
  const options = [
    { id: "latest", label: "Default", icon: <MdSort size={20} /> },
    {
      id: "priceLow",
      label: "Price: Low to High",
      icon: <MdTrendingUp size={20} />,
    },
    {
      id: "priceHigh",
      label: "Price: High to Low",
      icon: <MdTrendingDown size={20} />,
    },
    { id: "nameAZ", label: "Name: A to Z", icon: <MdTextFields size={20} /> },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Semi-transparent Backdrop - clicking here closes the modal */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-[2px] animate-in fade-in duration-300"
        onClick={() => setIsFilterOpen(false)}
      ></div>

      {/* Side Drawer Content */}
      <div className="relative w-[80%] max-w-[300px] h-full bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b border-gray-50">
          <h3 className="text-lg font-black text-gray-800 uppercase tracking-tighter">
            Sort By
          </h3>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="p-1 text-gray-400 hover:text-pink-500 transition-colors"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Options List */}
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                setSortOption(option.id);
                setIsFilterOpen(false);
              }}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                sortOption === option.id
                  ? "bg-pink-50 text-[#d43790]"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={
                    sortOption === option.id
                      ? "text-[#d43790]"
                      : "text-gray-300"
                  }
                >
                  {option.icon}
                </span>
                <span className="text-sm font-bold tracking-tight">
                  {option.label}
                </span>
              </div>

              {/* Minimal Checkmark/Indicator */}
              {sortOption === option.id && (
                <div className="w-1.5 h-1.5 bg-[#d43790] rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-50 bg-gray-50/50">
          <p className="text-[10px] text-gray-400 font-bold text-center uppercase tracking-widest">
            WUB Beauty Hub
          </p>
        </div>
      </div>
    </div>
  );
};

SortModal.propTypes = {
  sortOption: PropTypes.string.isRequired,
  setSortOption: PropTypes.func.isRequired,
  setIsFilterOpen: PropTypes.func.isRequired,
};

export default SortModal;
