import {
  MdCloudUpload,
  MdOutlineCategory,
  MdAttachMoney,
  MdDescription,
  MdLocationOn,
  MdScience,
  MdFace,
} from "react-icons/md";
import useProductForm from "../hooks/useProductForm";

const Add = () => {
  const {
    item,
    preview,
    uploading,
    handleChange,
    handleImageChange,
    handleSubmit,
  } = useProductForm();

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4 pb-32">
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 w-full max-w-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-gray-800">Post New Ad</h2>
          <p className="text-gray-500 text-sm mt-2">
            Fill in the details to list your product
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 text-sm font-bold mb-2">
              <MdOutlineCategory className="text-pink-500" /> Product Name
            </label>
            <input
              type="text"
              name="name"
              value={item.name}
              onChange={handleChange}
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              placeholder="e.g. Organic Face Cream"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 text-sm font-bold mb-2">
              <MdDescription className="text-pink-500" /> Description
            </label>
            <textarea
              name="description"
              value={item.description}
              onChange={handleChange}
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              rows="3"
              placeholder="Tell us about the product..."
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 text-sm font-bold mb-2">
                <MdAttachMoney className="text-pink-500" /> Price (ETB)
              </label>
              <input
                type="number"
                name="price"
                value={item.price}
                onChange={handleChange}
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                placeholder="0.00"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 text-sm font-bold mb-2">
                <MdOutlineCategory className="text-pink-500" /> Category
              </label>
              <select
                name="category"
                value={item.category}
                onChange={handleChange}
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                required
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Perfume">Perfume</option>
                <option value="Lotion">Lotion</option>
                <option value="Facial">Facial</option>
                <option value="Treatment">Treatment</option>
                <option value="Hair">Hair</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>

          {/* Skin Type */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 text-sm font-bold mb-2">
              <MdFace className="text-pink-500" /> Suitable Skin Type
            </label>
            <select
              name="skinType"
              value={item.skinType}
              onChange={handleChange}
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 transition-all"
            >
              <option value="All">All Skin Types</option>
              <option value="Oily">Oily Skin</option>
              <option value="Dry">Dry Skin</option>
              <option value="Sensitive">Sensitive Skin</option>
            </select>
          </div>

          {/* Ingredients */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 text-sm font-bold mb-2">
              <MdScience className="text-pink-500" /> Key Ingredients
            </label>
            <textarea
              name="ingredients"
              value={item.ingredients}
              onChange={handleChange}
              placeholder="Aloe Vera, Vitamin C, etc."
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 transition-all"
              rows="2"
            ></textarea>
          </div>

          {/* Address */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 text-sm font-bold mb-2">
              <MdLocationOn className="text-pink-500" /> Shop Location
            </label>
            <input
              type="text"
              name="address"
              value={item.address}
              onChange={handleChange}
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              placeholder="e.g. Bole, Medhanialem"
              required
            />
          </div>

          {/* Image Upload Area */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 text-sm font-bold mb-2">
              <MdCloudUpload className="text-pink-500" /> Product Images
            </label>
            <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-4 hover:border-pink-300 transition-colors bg-gray-50">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                multiple
              />
              <div className="text-center">
                <MdCloudUpload className="mx-auto text-gray-400" size={30} />
                <p className="text-xs text-gray-500 mt-1">
                  Tap to upload photos (Max 5)
                </p>
              </div>
            </div>

            {/* Image Preview */}
            {preview.length > 0 && (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {preview.map((imgSrc, index) => (
                  <div key={index} className="relative flex-shrink-0">
                    <img
                      src={imgSrc}
                      alt={`Preview ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-xl border border-gray-100 shadow-sm"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-4 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-[0.98] ${
              uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-pink-600 hover:bg-pink-700 shadow-pink-100"
            }`}
            disabled={uploading}
          >
            {uploading ? "Uploading Product..." : "Post Ad Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
