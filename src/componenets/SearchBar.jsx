import { useState, useEffect } from "react";
import { BiSearch, BiHistory } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { MdClose, MdClear } from "react-icons/md";
import PropTypes from "prop-types";

/**
 * SearchBar Component
 * Includes search input, search history management, and filter trigger.
 */
const SearchBar = ({ searchQuery, setSearchQuery, onFilterClick }) => {
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load search history from localStorage when the component starts
  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(savedHistory);
  }, []);

  // Save the search term to history when 'Enter' is pressed
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      const newHistory = [
        searchQuery.trim(),
        ...history.filter((item) => item !== searchQuery.trim()),
      ].slice(0, 5); // Keep only the latest 5 unique searches

      setHistory(newHistory);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
      setShowHistory(false);
    }
  };

  // Delete a specific search item from history
  const removeFromHistory = (itemToRemove) => {
    const newHistory = history.filter((item) => item !== itemToRemove);
    setHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  return (
    <div className="relative px-5 my-6">
      <div className="flex items-center justify-between gap-3">
        {/* Search Input Container */}
        <div className="flex bg-white items-center w-full p-2 rounded-2xl shadow-sm border border-transparent focus-within:border-pink-300 transition-all">
          <BiSearch size={20} className="text-gray-400" />

          <input
            type="text"
            className="ml-2 w-full focus:outline-none bg-transparent text-gray-700 font-medium"
            placeholder="Search products..."
            value={searchQuery}
            onFocus={() => setShowHistory(true)}
            // Small delay to allow clicking on history items before dropdown closes
            onBlur={() => setTimeout(() => setShowHistory(false), 200)}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="pr-1">
              <MdClose
                size={18}
                className="text-gray-400 hover:text-pink-500 transition-colors"
              />
            </button>
          )}
        </div>

        {/* Filter Button - Triggers the sort modal in Shop.jsx */}
        <button
          onClick={onFilterClick}
          className="p-3 rounded-full active:scale-90 transition-transform bg-[#d43790] text-white shadow-md cursor-pointer flex items-center justify-center"
        >
          <FiFilter size={20} />
        </button>
      </div>

      {/* Search History Dropdown Menu */}
      {showHistory && history.length > 0 && (
        <div className="absolute top-full left-5 right-16 mt-2 bg-white rounded-2xl shadow-xl z-50 border border-pink-50 overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="p-3 border-b border-gray-50 flex justify-between items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Recent Searches
            </span>
            <button
              onClick={() => {
                setHistory([]);
                localStorage.removeItem("searchHistory");
              }}
              className="text-[10px] text-pink-500 font-bold hover:underline"
            >
              CLEAR ALL
            </button>
          </div>

          <ul>
            {history.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between px-4 py-3 hover:bg-pink-50 transition-colors cursor-pointer"
              >
                <div
                  className="flex items-center flex-1"
                  onClick={() => {
                    setSearchQuery(item);
                    setShowHistory(false);
                  }}
                >
                  <BiHistory className="text-gray-400 mr-3" size={18} />
                  <span className="text-sm text-gray-700 font-medium">
                    {item}
                  </span>
                </div>
                <button
                  onClick={() => removeFromHistory(item)}
                  className="p-1 hover:bg-white rounded-full transition-colors"
                >
                  <MdClear
                    className="text-gray-300 hover:text-red-400"
                    size={16}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Prop validation
SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  onFilterClick: PropTypes.func.isRequired, // Added requirement for filter click
};

export default SearchBar;
