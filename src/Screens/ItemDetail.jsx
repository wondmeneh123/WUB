// src/Screens/ItemDetail.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const ItemDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};

  if (!item) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-700 text-lg">
          Item not found. Please go back to the shop page.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="mt-4 bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-full">
      {/* Custom Header/Back Button Section */}
      <div className="flex items-center p-4 bg-white sticky top-0 z-10 shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="text-pink-600 rounded-full p-2 hover:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <IoIosArrowBack size={24} />
        </button>
        {/* Item name as the page title */}
        <h1 className="text-xl font-bold text-gray-800 ml-3 truncate">
          {item.name}
        </h1>
      </div>

      {/* Main Content Area (Scrollable part) */}
      <div className="px-4 pb-20">
        {/* Image Section - FIX: Centered and size controlled */}
        <div className="flex justify-center my-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-full max-w-xl mx-auto h-64 sm:h-80 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Item Details - FIX: Content centered for larger screens */}
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-pink-600 mb-2">{item.name}</h2>
          <p className="text-gray-700 text-sm mb-4">{item.description}</p>

          <div className="flex items-center justify-between mb-4 border-t border-b py-3">
            <p className="text-2xl font-extrabold text-[#d43790]">
              {item.price} Br
            </p>
            <p className="bg-pink-100 text-pink-600 rounded-lg px-3 py-1 text-sm font-semibold">
              {item.category}
            </p>
          </div>

          <p className="text-gray-600 mb-6">Location: {item.address}</p>

          {/* Vendor Information */}
          {item.vendor && (
            <div className="mb-6 p-4 bg-pink-50 rounded-lg">
              <h3 className="text-lg font-semibold text-pink-700 mb-2">
                Vendor Information
              </h3>
              <p className="text-gray-700">Name: {item.vendor.name}</p>
              <p className="text-gray-700">Phone: {item.vendor.phoneNumber}</p>
              <p className="text-gray-700">Rating: {item.vendor.rating} / 5</p>
            </div>
          )}

          {/* Reviews Section */}
          {item.reviews && item.reviews.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Customer Reviews
              </h3>
              {item.reviews.map((review, index) => (
                <div
                  key={index}
                  className="mb-4 bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <p className="text-gray-800 font-semibold">{review.user}</p>
                  <p className="text-gray-600 mt-1">{review.comment}</p>
                  <p className="text-yellow-500 mt-2 text-sm">
                    Rating: {"⭐".repeat(review.rating)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button (Add to Cart/Call Vendor) */}
      <div className="fixed bottom-20 left-0 right-0 p-4 z-40">
        {/* FIX: Centered button for larger screens */}
        <button className="w-full max-w-xl mx-auto block bg-[#d43790] text-white py-3 rounded-full shadow-lg hover:bg-pink-700 transition-colors font-bold text-lg">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ItemDetail;
