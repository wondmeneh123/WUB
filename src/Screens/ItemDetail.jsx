import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom"; // Link ተጨምሯል
import { IoIosArrowBack, IoMdCheckmarkCircle } from "react-icons/io";
import { HiMiniBellAlert } from "react-icons/hi2"; // አዲሱ Header icon
import { FiShoppingCart, FiUser } from "react-icons/fi"; // አዲሱ Header icons
import {
  MdOutlineScience,
  MdOutlineInfo,
  MdLocationOn,
  MdStore,
  MdShare,
  MdContentCopy,
  MdAccessTime,
  MdLabel,
  MdListAlt,
  MdPublic,
  MdInventory,
  MdGavel,
  MdChat,
} from "react-icons/md";
import PropTypes from "prop-types";

import ProductReviews from "./ProductReviews";
import RelatedProducts from "./RelatedProducts";
import SocialConnect from "./SocialConnect";

const ItemDetail = ({ addToCart }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { item, allItems } = location.state || {};
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [added, setAdded] = useState(false);

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

  // DYNAMIC STORE DATA
  const storePhone = item.phone || item.phoneNumber || "+251900000000";
  const storeAddress = item.address || "Address not specified";
  const storeLocation = `${item.city || "Addis Ababa"} • ${
    item.subCity || "Location"
  }`;
  const storeSchedule = item.workingHours || "Mon - Sat, 08:00 - 18:00";

  const handleAddToCart = () => {
    if (addToCart) {
      addToCart(item);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${storeLocation}, ${storeAddress}`);
    alert("Address copied!");
  };

  const socialLinks = {
    facebook: item.facebook || "#",
    instagram: item.instagram || "#",
    telegram: item.telegram || "#",
    whatsapp: `https://wa.me/${storePhone.replace(
      /\+/g,
      ""
    )}?text=Interested in ${item.name}`,
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-44">
      {/* --- የአንተ አዲሱ Header ክፍል --- */}
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate(-1)}
              className="text-indigo-600 mr-2"
            >
              <IoIosArrowBack size={24} />
            </button>
            <p className="font-extrabold text-2xl text-indigo-600 tracking-wide">
              WUB<span className="text-gray-800">Mart</span>
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/notifications"
              className="text-gray-600 hover:text-pink-600 transition-colors"
            >
              <HiMiniBellAlert size={24} />
            </Link>

            <Link
              to="/cart"
              className="text-gray-600 hover:text-pink-600 transition-colors relative"
            >
              <FiShoppingCart size={24} />
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>

            <Link
              to="/profile"
              className="text-gray-600 hover:text-pink-600 transition-colors"
            >
              <FiUser size={24} />
            </Link>
          </div>
        </div>
      </div>
      {/* --- Header መጨረሻ --- */}

      <div className="max-w-2xl mx-auto">
        {/* Slider Section */}
        <div className="bg-white relative h-80 flex items-center justify-center overflow-hidden">
          <img
            src={images[currentImageIndex] || placeholderImage}
            alt={item.name}
            className="max-h-full object-contain"
          />
          {images.length > 1 && (
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between">
              <button
                onClick={() =>
                  setCurrentImageIndex(
                    (p) => (p - 1 + images.length) % images.length
                  )
                }
                className="bg-white/80 p-2 rounded-full shadow"
              >
                ❮
              </button>
              <button
                onClick={() =>
                  setCurrentImageIndex((p) => (p + 1) % images.length)
                }
                className="bg-white/80 p-2 rounded-full shadow"
              >
                ❯
              </button>
            </div>
          )}
          {/* Share button moved to top of image area */}
          <button className="absolute top-4 right-4 bg-white/80 text-pink-600 p-2 rounded-full shadow-sm">
            <MdShare size={24} />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Price & Status Section */}
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold uppercase text-pink-500 bg-pink-50 px-2 py-1 rounded">
                {item.category}
              </span>
              <h2 className="text-2xl font-extrabold text-gray-900 mt-2">
                {item.name}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-gray-900">
                ETB {item.price}
              </p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <MdGavel
                  size={14}
                  className={
                    item.isNegotiable ? "text-blue-500" : "text-gray-400"
                  }
                />
                <span
                  className={`text-[11px] font-bold uppercase ${
                    item.isNegotiable ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {item.isNegotiable ? "Negotiable" : "Fixed Price"}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Specs */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
              <MdLabel className="text-purple-500" />
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold">
                  Brand
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {item.brand || "Generic"}
                </p>
              </div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
              <MdInventory className="text-orange-500" />
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold">
                  Quantity
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {item.quantity ? `${item.quantity} in stock` : "Available"}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Specs Card */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-4 flex items-center gap-2">
              <MdListAlt className="text-pink-600" /> Detailed Specifications
            </h3>
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div className="border-r pr-4">
                <p className="text-gray-400 text-xs uppercase">Product Type</p>
                <p className="font-bold text-gray-700">
                  {item.productType || "Standard"}
                </p>
              </div>
              <div className="pl-4">
                <p className="text-gray-400 text-xs uppercase">Origin</p>
                <div className="flex items-center gap-1">
                  <MdPublic className="text-blue-400" size={14} />
                  <p className="font-bold text-gray-700">
                    {item.origin || "Imported"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Store Information Section */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest flex items-center gap-2">
                <MdChat className="text-pink-600" size={18} /> Store Information
              </h3>
              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>{" "}
                Open
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-pink-100 p-2 rounded-lg text-pink-600">
                    <MdStore size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase">
                      Shop Name
                    </p>
                    <p className="font-bold text-gray-800">
                      {item.storeName || "WUB Shop"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`tel:${storePhone}`}
                    className="bg-green-500 text-white px-4 py-2 rounded-xl text-xs font-bold active:scale-95 transition-transform"
                  >
                    CALL
                  </a>
                  <button
                    onClick={() =>
                      navigate("/chat", {
                        state: { storeName: item.storeName, item: item },
                      })
                    }
                    className="bg-pink-600 text-white px-4 py-2 rounded-xl text-xs font-bold active:scale-95 transition-transform shadow-sm"
                  >
                    CHAT
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <MdLocationOn size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-gray-400 uppercase font-bold">
                    {storeLocation}
                  </p>
                  <p className="text-sm text-gray-800 font-medium">
                    {storeAddress}
                  </p>
                </div>
                <button
                  onClick={handleCopyAddress}
                  className="text-pink-600 p-1"
                >
                  <MdContentCopy size={18} />
                </button>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-dashed border-gray-200">
                <MdAccessTime className="text-amber-600" size={18} />
                <p className="text-xs font-bold text-gray-600">
                  {storeSchedule}
                </p>
              </div>
            </div>
          </div>

          <SocialConnect links={socialLinks} />

          {/* Ingredients & Use */}
          <div className="space-y-4">
            <section className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold flex items-center gap-2 mb-3 text-purple-600">
                <MdOutlineScience /> Ingredients
              </h3>
              <p className="text-gray-600 text-sm">
                {item.ingredients || "Contact store."}
              </p>
            </section>
            <section className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold flex items-center gap-2 mb-3 text-amber-600">
                <MdOutlineInfo /> How To Use
              </h3>
              <p className="text-gray-600 text-sm">
                {item.howToUse || "Follow packaging."}
              </p>
            </section>
          </div>

          <ProductReviews reviews={item.reviews} />
          <RelatedProducts currentItem={item} products={allItems || []} />
        </div>
      </div>

      {/* Floating Bottom Add to Cart */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t p-4 z-50">
        <button
          onClick={handleAddToCart}
          disabled={added}
          className={`w-full max-w-xl mx-auto flex items-center justify-center gap-2 py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-95 ${
            added
              ? "bg-green-500 text-white"
              : "bg-pink-600 text-white shadow-pink-100"
          }`}
        >
          {added ? (
            <>
              <IoMdCheckmarkCircle size={20} /> Added to Cart
            </>
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </div>
  );
};

ItemDetail.propTypes = { addToCart: PropTypes.func };
export default ItemDetail;
