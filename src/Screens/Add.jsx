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
    <div className="min-h-screen bg-pink-50 flex justify-center py-8">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-extrabold text-pink-600 mb-6 text-center">
          Add New Product
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Item Name */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="name"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={item.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={item.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              rows="3"
              placeholder="Enter product description"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="price"
              >
                Price (Br)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={item.price}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="0.00"
                required
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={item.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
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

          {/* --- አዲስ የተጨመሩ የኮስሞቲክስ መረጃዎች --- */}

          {/* Skin Type Selection */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Suitable Skin Type ✨
            </label>
            <select
              name="skinType"
              value={item.skinType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            >
              <option value="All">All Skin Types</option>
              <option value="Oily">Oily Skin</option>
              <option value="Dry">Dry Skin</option>
              <option value="Sensitive">Sensitive Skin</option>
            </select>
          </div>

          {/* Ingredients Textarea */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Key Ingredients 🧪
            </label>
            <textarea
              name="ingredients"
              value={item.ingredients}
              onChange={handleChange}
              placeholder="e.g. Aloe Vera, Vitamin C, Hyaluronic Acid"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              rows="2"
            ></textarea>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={item.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Shop location"
              required
            />
          </div>

          {/* Upload Images */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="image"
            >
              Upload Images (Select up to 5)
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              multiple
            />

            {preview.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                {preview.map((imgSrc, index) => (
                  <div key={index} className="relative">
                    <img
                      src={imgSrc}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg shadow-sm"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="my-6">
            <button
              type="submit"
              className={`w-full py-3 px-4 text-white font-bold rounded-lg shadow-md ${
                uploading ? "bg-gray-400" : "bg-pink-600 hover:bg-pink-700"
              } transition-all focus:outline-none focus:ring-2 focus:ring-pink-500`}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
