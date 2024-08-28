import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ItemDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};

  if (!item) {
    return <p>Item not found!</p>;
  }

  return (
    <div className="fixed inset-0 flex ">
      <div className="bg-white p-6 overflow-auto max-w-screen-lg w-full mx-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-red-500 text-white rounded-full p-2 mb-4 hover:bg-red-600"
        >
          Close
        </button>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
        <p className="text-gray-700 mb-2">{item.description}</p>
        <p className="text-gray-900 font-bold text-lg mb-2">{item.price} Br</p>
        <p className="bg-red-500 w-[100px] text-white  rounded-lg px-2 py-1 mb-2">
          {item.category}
        </p>
        <p className="text-gray-700 mb-2">{item.address}</p>

        {/* Display tags */}
        <div className="flex gap-2 mb-4"></div>
        {/* Display vendor information
        <h3 className="text-xl font-semibold mb-2">Vendor Information</h3>
        <p className="text-gray-700 mb-2">Name: {item.vendor.name}</p>
        <p className="text-gray-700 mb-2">Phone: {item.vendor.phoneNumber}</p>
        <p className="text-gray-700 mb-2">Rating: {item.vendor.rating}</p> */}
        {/* Display reviews */}
        <h3 className="text-xl font-semibold mb-2">Reviews</h3>
        {/* {item.reviews.map((review, index) => (
          <div key={index} className="mb-2">
            <p className="text-gray-700 font-semibold">{review.user}</p>
            <p className="text-gray-700">{review.comment}</p>
            <p className="text-yellow-500">Rating: {review.rating}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default ItemDetail;
