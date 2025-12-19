import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineScience, MdAutoFixHigh, MdOutlineInfo } from "react-icons/md";
import PropTypes from "prop-types";

const ItemDetail = ({ addToCart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600">No product selected.</p>
          <button
            className="mt-4 px-4 py-2 bg-pink-500 text-white rounded"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const images = item.images || [];

  const storePhone = item.phone || "+2519..."; // replace with real number if available
  const waMessage = `Hi, I'm interested in ${item.name} from WUB Marketplace. ${window.location.href}`;
  const waLink = `https://wa.me/?text=${encodeURIComponent(waMessage)}`;
  const telLink = `tel:${storePhone}`;
  const mapsLink = item.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        item.address
      )}`
    : "https://www.google.com/maps";

  const handleNext = () => setCurrentImageIndex((p) => (p + 1) % images.length);
  const handlePrev = () =>
    setCurrentImageIndex((p) => (p - 1 + images.length) % images.length);

  const handleAddToCart = () => {
    if (addToCart) addToCart(item);
    else console.warn("addToCart not provided");
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
        <h1 className="text-lg font-semibold text-gray-800 ml-3 truncate">
          {item.name}
        </h1>
      </div>

      <div className="px-4 pb-40">
        {/* Simple Carousel (no Swiper) */}
        <div className="rounded-lg overflow-hidden mt-4 relative">
          {images.length > 0 ? (
            <>
              <img
                src={images[currentImageIndex]}
                alt={`${item.name} ${currentImageIndex + 1}`}
                className="w-full h-72 sm:h-96 object-contain bg-white"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md"
                  >
                    ‹
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md"
                  >
                    ›
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center bg-gray-100 h-72 sm:h-96">
              <div className="p-6 text-gray-500">No images</div>
            </div>
          )}
        </div>

        <div className="max-w-xl mx-auto mt-4 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
              <p className="text-pink-500 font-semibold mt-1">
                {item.badges || ""}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">
                {item.price ? `ETB ${item.price}` : ""}
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="bg-white rounded-md p-4 shadow-sm flex items-start gap-3">
              <div className="bg-pink-50 text-pink-600 p-2 rounded-lg">
                <MdAutoFixHigh size={18} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">Skin Type</h3>
                <p className="mt-1 text-gray-800">{item.skinType || "All"}</p>
              </div>
            </div>

            <div className="bg-white rounded-md p-4 shadow-sm flex items-start gap-3">
              <div className="bg-purple-50 text-purple-600 p-2 rounded-lg">
                <MdOutlineScience size={18} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">
                  Ingredients
                </h3>
                <p className="mt-1 text-gray-700 whitespace-pre-line text-sm leading-relaxed">
                  {item.ingredients || "Not specified."}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-md p-4 shadow-sm flex items-start gap-3">
              <div className="bg-amber-50 text-amber-700 p-2 rounded-lg">
                <MdOutlineInfo size={18} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">
                  How To Use
                </h3>
                <p className="mt-1 text-gray-700 whitespace-pre-line text-sm leading-relaxed">
                  {item.howToUse || "Not specified."}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700">Description</h3>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>

            <p className="text-sm text-gray-500 italic">
              📍 Location: {item.address || "Not provided"}
            </p>
          </div>
        </div>
      </div>

      {/* Sticky bottom area: Add to Cart + contact buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <div className="max-w-xl mx-auto p-3">
          <button
            onClick={handleAddToCart}
            className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold mb-2"
          >
            Add to Cart
          </button>

          <div className="grid grid-cols-3 gap-2">
            <a
              href={telLink}
              className="block text-center bg-pink-100 text-pink-700 py-2 rounded"
            >
              Call Now
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="block text-center bg-green-100 text-green-700 py-2 rounded"
            >
              WhatsApp
            </a>
            <a
              href={mapsLink}
              target="_blank"
              rel="noreferrer"
              className="block text-center bg-gray-100 text-gray-700 py-2 rounded"
            >
              Location
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

ItemDetail.propTypes = {
  addToCart: PropTypes.func,
};

export default ItemDetail;
