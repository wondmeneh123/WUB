// src/Screens/Cart.jsx
import {
  MdOutlineRemoveCircleOutline,
  MdAddCircleOutline,
  MdDeleteForever,
  MdArrowBackIos,
} from "react-icons/md";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, updateCartQuantity, removeFromCart }) => {
  const navigate = useNavigate();

  const getTotal = () => {
    return cart
      .reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0
      )
      .toFixed(2);
  };

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center h-full flex flex-col justify-center items-center min-h-screen">
        <MdOutlineRemoveCircleOutline
          size={60}
          className="text-gray-400 mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-pink-600 text-white rounded-full font-bold shadow-md active:scale-95 transition-all"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 pb-44 bg-gray-50 min-h-screen">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-white rounded-full shadow-sm text-pink-600 active:scale-90 transition-all"
        >
          <MdArrowBackIos size={20} className="ml-1" />
        </button>
        <h1 className="text-2xl font-extrabold text-[#d43790]">
          Shopping Cart
        </h1>
      </div>

      {/* Cart Items List */}
      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
          >
            {/* Item Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
            />

            {/* Item Details */}
            <div className="flex flex-col flex-grow min-w-0">
              <h3 className="text-base font-bold truncate text-gray-800">
                {item.name}
              </h3>
              <p className="text-xs text-gray-400 mb-2">{item.category}</p>

              <div className="flex items-center justify-between">
                <p className="text-lg font-black text-pink-600">
                  {(parseFloat(item.price) * item.quantity).toFixed(2)} Br
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center bg-gray-50 rounded-lg px-2 py-1 gap-3">
                  <button
                    onClick={() => updateCartQuantity(item.id, -1)}
                    className="text-gray-400 hover:text-red-500 disabled:opacity-30"
                    disabled={item.quantity <= 1}
                  >
                    <MdOutlineRemoveCircleOutline size={22} />
                  </button>

                  <span className="text-sm font-bold w-4 text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => updateCartQuantity(item.id, 1)}
                    className="text-pink-500"
                  >
                    <MdAddCircleOutline size={22} />
                  </button>
                </div>
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-gray-300 hover:text-red-600 transition-colors p-1"
            >
              <MdDeleteForever size={24} />
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary (Fixed at the bottom) */}
      <div className="fixed bottom-20 left-0 right-0 bg-white/90 backdrop-blur-md shadow-[0_-10px_20px_rgba(0,0,0,0,0.05)] p-5 border-t border-gray-100 z-40">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                Subtotal
              </p>
              <p className="text-2xl font-black text-gray-800">
                {getTotal()}{" "}
                <span className="text-sm font-normal text-gray-500">Br</span>
              </p>
            </div>
            <p className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {cart.length} Items
            </p>
          </div>

          <button className="w-full bg-pink-600 text-white py-4 rounded-2xl shadow-lg shadow-pink-200 hover:bg-pink-700 active:scale-[0.98] transition-all font-bold text-lg">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      quantity: PropTypes.number.isRequired,
      image: PropTypes.string,
      name: PropTypes.string,
      category: PropTypes.string,
    })
  ).isRequired,
  updateCartQuantity: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default Cart;
