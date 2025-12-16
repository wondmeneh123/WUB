import { Link } from "react-router-dom";
import { HiMiniBellAlert } from "react-icons/hi2";
import { FiShoppingCart, FiUser } from "react-icons/fi";

const Header = () => {
  return (
    <div className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2 justify-center">
          <p className="font-extrabold text-2xl text-indigo-600 tracking-wide text-center">
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
  );
};

export default Header;
