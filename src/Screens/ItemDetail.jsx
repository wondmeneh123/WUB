import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ItemDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700 text-lg">Item not found!</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-100">
      <div className="bg-white pt-3 pb-6 px-6 overflow-auto max-w-screen-md w-full mx-4 shadow-lg rounded-lg">
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-pink-500 text-white rounded-full p-2 mb-4 hover:bg-pink-600 transition-colors"
        >
          Close
        </button>

        {/* Image Section */}
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-64 object-cover rounded-md mb-6 shadow-md"
        />

        {/* Item Details */}
        <h2 className="text-3xl font-bold text-pink-600 mb-2">{item.name}</h2>
        <p className="text-gray-700 text-sm mb-4">{item.description}</p>

        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-bold text-gray-900">{item.price} Br</p>
          <p className="bg-pink-500 text-white rounded-lg px-3 py-1 text-sm">
            {item.category}
          </p>
        </div>

        <p className="text-gray-600 mb-4">Location: {item.address}</p>

        {/* Vendor Information */}
        {item.vendor && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Vendor Information
            </h3>
            <p className="text-gray-600">Name: {item.vendor.name}</p>
            <p className="text-gray-600">Phone: {item.vendor.phoneNumber}</p>
            <p className="text-gray-600">Rating: {item.vendor.rating} / 5</p>
          </div>
        )}

        {/* Reviews Section */}
        {item.reviews && item.reviews.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Reviews
            </h3>
            {item.reviews.map((review, index) => (
              <div
                key={index}
                className="mb-4 bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <p className="text-gray-800 font-semibold">{review.user}</p>
                <p className="text-gray-600">{review.comment}</p>
                <p className="text-yellow-500">
                  Rating: {"⭐".repeat(review.rating)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;
