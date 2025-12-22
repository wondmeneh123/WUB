import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoMdCheckmarkCircle } from "react-icons/io";
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

  // LOGIC
  const rawImages = Array.isArray(item.images)
    ? item.images
    : item.image
    ? [item.image]
    : [];
  const images = rawImages.filter(
    (img) => img && typeof img === "string" && img.trim() !== ""
  );

  const storePhone = item.phone || item.phoneNumber || "+251900000000";
  const storeAddress = item.address || "አድራሻ አልተገለጸም";
  const storeLocation = `${item.city || "Addis Ababa"} • ${
    item.subCity || "Addis Ketema"
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
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="text-pink-600 p-2">
            <IoIosArrowBack size={24} />
          </button>
          <h1 className="text-lg font-bold text-gray-800 ml-2 truncate max-w-[200px]">
            {item.name}
          </h1>
        </div>
        <button className="text-pink-600 p-2">
          <MdShare size={24} />
        </button>
      </div>

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

          {/* Product Quick Specs */}
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

          {/* Detailed Specifications Card */}
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
                <p className="text-gray-400 text-xs uppercase">
                  Country of Origin
                </p>
                <div className="flex items-center gap-1">
                  <MdPublic className="text-blue-400" size={14} />
                  <p className="font-bold text-gray-700">
                    {item.origin || "Imported"}
                  </p>
                </div>
              </div>
              <div className="border-r pr-4 pt-2 border-t mt-2">
                <p className="text-gray-400 text-xs uppercase">
                  Net Weight/Size
                </p>
                <p className="font-bold text-gray-700">
                  {item.size || item.weight || "N/A"}
                </p>
              </div>
              <div className="pl-4 pt-2 border-t mt-2">
                <p className="text-gray-400 text-xs uppercase">Material</p>
                <p className="font-bold text-gray-700">
                  {item.material || "Quality Grade"}
                </p>
              </div>
            </div>
          </div>

          {/* Store Information */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">
                Store Information
              </h3>
              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>{" "}
                Open now
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
                <a
                  href={`tel:${storePhone}`}
                  className="bg-green-500 text-white px-4 py-2 rounded-xl text-xs font-bold active:scale-95"
                >
                  CALL
                </a>
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
                <p className="text-xs font-bold text-gray-600 tracking-tight">
                  {storeSchedule}
                </p>
              </div>
            </div>
          </div>

          <SocialConnect links={socialLinks} />

          <div className="space-y-4">
            <section className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold flex items-center gap-2 mb-3 text-purple-600">
                <MdOutlineScience /> Ingredients
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.ingredients || "Contact store for details."}
              </p>
            </section>
            <section className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold flex items-center gap-2 mb-3 text-amber-600">
                <MdOutlineInfo /> How To Use
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.howToUse || "Follow packaging instructions."}
              </p>
            </section>
          </div>

          <ProductReviews reviews={item.reviews} />
          <RelatedProducts currentItem={item} products={allItems || []} />
        </div>
      </div>

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
