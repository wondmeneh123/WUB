// src/Screens/Cart.jsx
import React from "react";
import {
  MdOutlineRemoveCircleOutline,
  MdAddCircleOutline,
  MdDeleteForever,
} from "react-icons/md";

// Cart component receives the cart state and the setter functions as props
const Cart = ({ cart, updateCartQuantity, removeFromCart }) => {
  const getTotal = () => {
    // Correctly calculates total price (price * quantity) and formats to two decimal places
    return cart
      .reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0
      )
      .toFixed(2);
  }; // Display message if cart is empty

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center h-full flex flex-col justify-center items-center">
               {" "}
        <MdOutlineRemoveCircleOutline
          size={60}
          className="text-gray-400 mb-4"
        />
               {" "}
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
                    Your Cart is Empty        {" "}
        </h2>
               {" "}
        <p className="text-gray-500">
                    Looks like you haven't added anything to your cart yet.    
             {" "}
        </p>
             {" "}
      </div>
    );
  }

  return (
    <div className="p-4 pb-32 bg-gray-50 min-h-screen">
           {" "}
      <h1 className="text-3xl font-extrabold text-[#d43790] mb-6 border-b pb-2">
                Shopping Cart ({cart.length} unique items)      {" "}
      </h1>
            {/* Cart Items List */}     {" "}
      <div className="flex flex-col gap-4">
               {" "}
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-xl shadow-md flex items-center gap-4"
          >
                        {/* Item Image */}
                       {" "}
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
            />
                        {/* Item Details and Controls */}           {" "}
            <div className="flex flex-col flex-grow">
                           {" "}
              <h3 className="text-lg font-semibold truncate text-gray-800">
                                {item.name}             {" "}
              </h3>
                           {" "}
              <p className="text-sm text-gray-500 mb-2">{item.category}</p>     
                      {/* Price and Quantity */}             {" "}
              <div className="flex items-center justify-between mt-2">
                                {/* Display calculated subtotal for the item */}
                               {" "}
                <p className="text-xl font-bold text-green-600">
                                   {" "}
                  {(parseFloat(item.price) * item.quantity).toFixed(2)} Br      
                           {" "}
                </p>
                               {" "}
                {/* Quantity Controls - FIX: onClick handlers UNCOMMENTED */}   
                           {" "}
                <div className="flex items-center space-x-2">
                                    {/* Decrement Button */}                 {" "}
                  <button
                    onClick={() => updateCartQuantity(item.id, -1)} // UNCOMMENTED
                    className="text-red-500 disabled:text-gray-300"
                    disabled={item.quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                                       {" "}
                    <MdOutlineRemoveCircleOutline size={24} />                 {" "}
                  </button>
                                    {/* Quantity Display */}                 {" "}
                  <span className="text-lg font-bold w-6 text-center">
                                        {item.quantity}                 {" "}
                  </span>
                                    {/* Increment Button */}                 {" "}
                  <button
                    onClick={() => updateCartQuantity(item.id, 1)} // UNCOMMENTED
                    className="text-green-500"
                    aria-label="Increase quantity"
                  >
                                        <MdAddCircleOutline size={24} />       
                             {" "}
                  </button>
                                 {" "}
                </div>
                             {" "}
              </div>
                         {" "}
            </div>
                        {/* Remove Button - FIX: onClick handler UNCOMMENTED */}
                       {" "}
            <button
              onClick={() => removeFromCart(item.id)} // UNCOMMENTED
              className="text-gray-400 hover:text-red-600 transition-colors"
              aria-label={`Remove ${item.name} from cart`}
            >
                            <MdDeleteForever size={24} />           {" "}
            </button>
                     {" "}
          </div>
        ))}
             {" "}
      </div>
            {/* Cart Summary (Fixed at the bottom) */}     {" "}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl p-4 border-t-4 border-[#d43790] z-40">
               {" "}
        <div className="flex justify-between items-center mb-4">
                   {" "}
          <p className="text-xl font-semibold text-gray-700">Total:</p>         {" "}
          <p className="text-2xl font-extrabold text-[#d43790]">
                        {getTotal()} Br          {" "}
          </p>
                 {" "}
        </div>
               {" "}
        <button
          className="w-full bg-pink-600 text-white py-3 rounded-full shadow-lg hover:bg-pink-700 transition-colors font-bold text-lg" // onClick={() => navigate('/checkout')}
        >
                    Proceed to Checkout        {" "}
        </button>
             {" "}
      </div>
         {" "}
    </div>
  );
};

export default Cart;
