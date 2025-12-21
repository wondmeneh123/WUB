import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import {
  MdOutlineScience,
  MdAutoFixHigh,
  MdOutlineInfo,
  MdLocationOn,
  MdPhone,
  MdStore,
  MdShare,
  MdContentCopy,
} from "react-icons/md";
import PropTypes from "prop-types";

import ProductReviews from "./ProductReviews";
import RelatedProducts from "./RelatedProducts";

const ItemDetail = ({ addToCart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fallback image if product has no photo
  const placeholderImage =
    "https://via.placeholder.com/400?text=No+Image+Available";

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600">No product selected.</p>
          <button
            className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-xl font-bold transition-transform active:scale-95"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // IMAGE LOGIC
  const rawImages = Array.isArray(item.images)
    ? item.images
    : item.image
    ? [item.image]
    : [];

  const images = rawImages.filter(
    (img) => img && typeof img === "string" && img.trim() !== ""
  );

  // CONTACT & STORE LOGIC
  const storePhone = item.phone || item.phoneNumber || "+251900000000";
  const storeAddress = item.address || "Addis Ababa, Ethiopia";
  const storeName = item.storeName || "WUB Shop";

  // ACTION FUNCTIONS
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(storeAddress);
    alert("Address copied to clipboard!");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.name,
          text: `Check out this product on WUB Marketplace: ${item.name}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Sharing failed", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(
        "Link copied to clipboard! (Sharing not supported on this browser)"
      );
    }
  };

  const waMessage = `Hi, I'm interested in ${item.name} from WUB Marketplace.`;
  const waLink = `https://wa.me/${storePhone.replace(
    /\+/g,
    ""
  )}?text=${encodeURIComponent(waMessage)}`;
  const telLink = `tel:${storePhone}`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    storeAddress
  )}`;

  const handleNext = () => setCurrentImageIndex((p) => (p + 1) % images.length);
  const handlePrev = () =>
    setCurrentImageIndex((p) => (p - 1 + images.length) % images.length);

  return (
    <div className="bg-gray-50 min-h-screen pb-44">
      {/* Sticky Header with Share */}
      <div className="flex items-center justify-between p-4 bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-pink-600 p-2 hover:bg-pink-50 rounded-full transition-colors"
          >
            <IoIosArrowBack size={24} />
          </button>
          <h1 className="text-lg font-bold text-gray-800 ml-2 truncate max-w-[200px]">
            {item.name}
          </h1>
        </div>
        <button
          onClick={handleShare}
          className="text-pink-600 p-2 hover:bg-pink-50 rounded-full transition-colors"
        >
          <MdShare size={24} />
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Image Slider Section */}
        <div className="bg-white relative group">
          <div className="relative h-80 sm:h-[450px] w-full overflow-hidden flex items-center justify-center">
            {images.length > 0 ? (
              <>
                <img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt={item.name}
                  className="max-w-full max-h-full object-contain transition-opacity duration-300"
                  onError={(e) => {
                    e.target.src = placeholderImage;
                  }}
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg"
                    >
                      ❮
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg"
                    >
                      ❯
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 rounded-full transition-all ${
                            i === currentImageIndex
                              ? "w-6 bg-pink-500"
                              : "w-1.5 bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <img
                src={placeholderImage}
                alt="Placeholder"
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
        </div>

        {/* Product Info & Store Details */}
        <div className="p-5 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-pink-500 bg-pink-50 px-2 py-1 rounded">
                {item.category || "General"}
              </span>
              <h2 className="text-2xl font-extrabold text-gray-900 mt-2">
                {item.name}
              </h2>
            </div>
            <p className="text-2xl font-black text-gray-900">
              ETB {item.price}
            </p>
          </div>

          {/* STORE INFO SECTION */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                Store Information
              </h3>
              <button
                onClick={handleCopyAddress}
                className="flex items-center gap-1 text-xs text-pink-600 font-bold bg-pink-50 px-2 py-1 rounded-lg active:scale-95 transition-all"
              >
                <MdContentCopy size={14} /> COPY
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-pink-100 text-pink-600 p-2.5 rounded-xl">
                <MdStore size={22} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Shop Name</p>
                <p className="font-bold text-gray-800">{storeName}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-blue-100 text-blue-600 p-2.5 rounded-xl">
                <MdLocationOn size={22} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Location / Address</p>
                <p className="font-bold text-gray-800 leading-tight">
                  {storeAddress}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-green-100 text-green-600 p-2.5 rounded-xl">
                <MdPhone size={22} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone Number</p>
                <p className="font-bold text-gray-800">{storePhone}</p>
              </div>
            </div>
          </div>

          {/* Product Type Detail */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="bg-purple-100 text-purple-600 p-3 rounded-xl">
                <MdAutoFixHigh size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">
                  Product Type
                </p>
                <p className="font-bold text-gray-800">
                  {item.skinType || "Standard"}
                </p>
              </div>
            </div>
          </div>

          {/* Ingredients & Usage */}
          <div className="space-y-4">
            <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3 text-purple-600">
                <MdOutlineScience size={20} />
                <h3 className="font-bold">Ingredients</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.ingredients ||
                  "Contact the store for the full ingredient list."}
              </p>
            </section>

            <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3 text-amber-600">
                <MdOutlineInfo size={20} />
                <h3 className="font-bold">How To Use</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.howToUse || "Follow the instructions on the packaging."}
              </p>
            </section>
          </div>

          {/* Product Reviews Section */}
          <ProductReviews reviews={item.reviews} />

          {/*  Related Products */}
          <RelatedProducts currentItem={item} />
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 z-50">
        <div className="max-w-xl mx-auto space-y-3">
          <button
            onClick={() => addToCart && addToCart(item)}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-pink-200 transition-all active:scale-95"
          >
            Add to Cart
          </button>

          <div className="grid grid-cols-3 gap-3">
            <a
              href={telLink}
              className="flex flex-col items-center justify-center bg-gray-100 py-3 rounded-xl text-gray-700 hover:bg-gray-200"
            >
              <span className="text-xs font-bold uppercase">Call</span>
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center justify-center bg-green-500 py-3 rounded-xl text-white hover:bg-green-600"
            >
              <span className="text-xs font-bold uppercase">WhatsApp</span>
            </a>
            <a
              href={mapsLink}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center justify-center bg-blue-500 py-3 rounded-xl text-white hover:bg-blue-600"
            >
              <span className="text-xs font-bold uppercase">Map</span>
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
