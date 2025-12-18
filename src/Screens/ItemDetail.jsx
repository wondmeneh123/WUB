// src/Screens/ItemDetail.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOutlineScience, MdAutoFixHigh, MdOutlineInfo } from "react-icons/md"; // አዲስ አይኮኖች
import PropTypes from "prop-types";

const ItemDetail = ({ addToCart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = item?.images || [];
  const hasMultipleImages = images.length > 1;

  if (!item) {
    return (
      <div className="p-4 text-center pt-20">
        <p className="text-gray-700 text-lg">Item not found.</p>
        <button
          onClick={() => navigate("/shop")}
          className="mt-4 bg-pink-600 text-white py-2 px-4 rounded-lg"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  const handleNext = () =>
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () =>
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleAddToCart = () => {
    if (addToCart) {
      addToCart(item);
    } else {
      console.error("addToCart function missing!");
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center p-4 bg-white sticky top-0 z-10 shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="text-pink-600 p-2 hover:bg-gray-100 rounded-full"
        >
          <IoIosArrowBack size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800 ml-3 truncate">
          {item.name}
        </h1>
      </div>

      <div className="px-4 pb-32">
        {/* Carousel */}
        <div className="flex justify-center my-4 relative group">
          <img
            src={images[currentImageIndex] || "https://via.placeholder.com/400"}
            alt={item.name}
            className="w-full max-w-xl mx-auto h-72 sm:h-96 object-cover rounded-2xl shadow-lg"
          />
          {hasMultipleImages && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
              >
                <IoIosArrowBack />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
              >
                <IoIosArrowForward />
              </button>
            </>
          )}
        </div>

        <div className="max-w-xl mx-auto space-y-6">
          {/* Basic Info */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                {item.name}
              </h2>
              <p className="text-[#d43790] text-2xl font-black mt-1">
                {item.price} Br
              </p>
            </div>
            <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
              {item.category}
            </span>
          </div>

          {/* New Specialized Features Section */}
          <div className="grid grid-cols-1 gap-4 pt-4 border-t">
            {/* Skin Type */}
            <div className="flex items-center space-x-3 bg-blue-50 p-3 rounded-xl">
              <div className="bg-blue-500 text-white p-2 rounded-lg">
                <MdAutoFixHigh size={20} />
              </div>
              <div>
                <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">
                  Skin Type
                </p>
                <p className="text-gray-800 font-medium">
                  {item.skinType || "All Skin Types"}
                </p>
              </div>
            </div>

            {/* Ingredients */}
            <div className="flex items-start space-x-3 bg-purple-50 p-3 rounded-xl">
              <div className="bg-purple-500 text-white p-2 rounded-lg">
                <MdOutlineScience size={20} />
              </div>
              <div>
                <p className="text-xs text-purple-600 font-bold uppercase tracking-wider">
                  Ingredients
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {item.ingredients ||
                    "Natural extracts, Vitamin E, Essential oils."}
                </p>
              </div>
            </div>

            {/* How to Use */}
            <div className="flex items-start space-x-3 bg-amber-50 p-3 rounded-xl">
              <div className="bg-amber-500 text-white p-2 rounded-lg">
                <MdOutlineInfo size={20} />
              </div>
              <div>
                <p className="text-xs text-amber-600 font-bold uppercase tracking-wider">
                  How to Use
                </p>
                <p className="text-gray-700 text-sm">
                  {item.howToUse ||
                    "Apply to clean skin twice daily for best results."}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {item.description}
            </p>
          </div>

          <p className="text-sm text-gray-500 italic">
            📍 Location: {item.address}
          </p>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t z-50">
        <button
          onClick={handleAddToCart}
          className="w-full max-w-xl mx-auto block bg-[#d43790] text-white py-4 rounded-2xl shadow-xl hover:bg-pink-700 transition-all font-bold text-lg active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

ItemDetail.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default ItemDetail;
