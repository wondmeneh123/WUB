import PropTypes from "prop-types";
import { MdSort, MdClose } from "react-icons/md";

const SortModal = ({ sortOption, setSortOption, setIsFilterOpen }) => {
  const options = [
    { id: "latest", label: "Default (Latest)", icon: <MdSort /> },
    { id: "priceLow", label: "Price: Low to High", icon: "💸" },
    { id: "priceHigh", label: "Price: High to Low", icon: "💰" },
    { id: "nameAZ", label: "Name: A to Z", icon: "🔤" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm transition-all">
      <div className="bg-white w-full rounded-t-[30px] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-800">Sort Products</h3>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="p-2 bg-gray-100 rounded-full"
          >
            <MdClose size={20} />
          </button>
        </div>

        <div className="space-y-3 pb-10">
          {options.map((option) => (
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
  );
};

SortModal.propTypes = {
  sortOption: PropTypes.string.isRequired,
  setSortOption: PropTypes.func.isRequired,
  setIsFilterOpen: PropTypes.func.isRequired,
};

export default SortModal;
