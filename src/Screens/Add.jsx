import {
  MdCloudUpload,
  MdLocationOn,
  MdArrowBackIos,
  MdHome,
  MdAddCircle,
  MdPerson,
} from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import useProductForm from "../hooks/useProductForm";

const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    item,
    preview,
    uploading,
    handleChange,
    handleImageChange,
    handleSubmit,
  } = useProductForm();

  const isActive = (path) => location.pathname === path;

  return (
    // Background ወደ መደበኛው ነጭ ተመልሷል
    <div className="min-h-screen bg-white pb-24 font-sans">
      {/* 1. Content Area */}
      <div className="pt-8 px-4 max-w-2xl mx-auto">
        {/* Title & Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-gray-50 rounded-full text-gray-600 hover:text-pink-600 active:scale-90 transition-all"
          >
            <MdArrowBackIos size={20} className="ml-1" />
          </button>
          {/* Add New Product - ደመቅ ያለ ሮዝ ተደርጓል */}
          <h1 className="text-3xl font-black text-[#E91E63] tracking-tight">
            Add New Product
          </h1>
        </div>

        {/* 2. Form Card */}
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-100/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 px-1">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={item.name}
                onChange={handleChange}
                className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-pink-300 transition-all outline-none"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 px-1">
                Description
              </label>
              <textarea
                name="description"
                value={item.description}
                onChange={handleChange}
                className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-pink-300 transition-all outline-none min-h-[120px]"
                placeholder="Enter product description"
                required
              ></textarea>
            </div>

            {/* Price & Category */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 px-1">
                  Price (Br)
                </label>
                <input
                  type="number"
                  name="price"
                  value={item.price}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-pink-300 transition-all"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 px-1">
                  Category
                </label>
                <select
                  name="category"
                  value={item.category}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-pink-300 transition-all outline-none"
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Perfume">Perfume</option>
                  <option value="Lotion">Lotion</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>

            {/* Shop Location */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 px-1">
                Shop Location
              </label>
              <div className="relative">
                <MdLocationOn
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500"
                  size={20}
                />
                <input
                  type="text"
                  name="address"
                  value={item.address}
                  onChange={handleChange}
                  className="w-full p-4 pl-12 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-pink-300 transition-all"
                  placeholder="e.g. Bole, Addis Ababa"
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 px-1">
                Product Images
              </label>
              <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-8 hover:border-pink-300 transition-all bg-gray-50 group text-center cursor-pointer">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  multiple
                />
                <MdCloudUpload
                  className="mx-auto text-gray-300 group-hover:text-pink-500 transition-colors"
                  size={40}
                />
                <p className="text-sm text-gray-500 mt-2 font-medium">
                  Tap to upload photos
                </p>
              </div>

              {preview.length > 0 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {preview.map((imgSrc, index) => (
                    <img
                      key={index}
                      src={imgSrc}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-xl border border-gray-100 shadow-sm"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button - ደመቅ ያለ ሮዝ */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={uploading}
                className={`w-full py-4 text-white text-lg font-black rounded-2xl shadow-lg transition-all active:scale-[0.98] ${
                  uploading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#E91E63] hover:bg-[#C2185B] shadow-pink-200"
                }`}
              >
                {uploading ? "Publishing..." : "Publish Ad Now"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 3. Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-100 py-3 px-8 flex items-center justify-between z-50">
        <button
          onClick={() => navigate("/")}
          className="flex flex-col items-center gap-1"
        >
          <MdHome
            size={26}
            className={isActive("/") ? "text-[#E91E63]" : "text-gray-400"}
          />
          <span
            className={`text-[10px] font-bold ${
              isActive("/") ? "text-[#E91E63]" : "text-gray-400"
            }`}
          >
            Home
          </span>
        </button>

        <button
          onClick={() => navigate("/cart")}
          className="flex flex-col items-center gap-1 relative"
        >
          <div className="relative">
            <FiShoppingCart
              size={24}
              className={isActive("/cart") ? "text-[#E91E63]" : "text-gray-400"}
            />
            <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white font-bold">
              1
            </span>
          </div>
          <span
            className={`text-[10px] font-bold ${
              isActive("/cart") ? "text-[#E91E63]" : "text-gray-400"
            }`}
          >
            Cart
          </span>
        </button>

        <button
          onClick={() => navigate("/add")}
          className="flex flex-col items-center gap-1"
        >
          <MdAddCircle
            size={26}
            className={isActive("/add") ? "text-[#E91E63]" : "text-gray-400"}
          />
          <span
            className={`text-[10px] font-bold ${
              isActive("/add") ? "text-[#E91E63]" : "text-gray-400"
            }`}
          >
            Post Ad
          </span>
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="flex flex-col items-center gap-1"
        >
          <MdPerson
            size={26}
            className={
              isActive("/profile") ? "text-[#E91E63]" : "text-gray-400"
            }
          />
          <span
            className={`text-[10px] font-bold ${
              isActive("/profile") ? "text-[#E91E63]" : "text-gray-400"
            }`}
          >
            Profile
          </span>
        </button>
      </div>
    </div>
  );
};

export default Add;
