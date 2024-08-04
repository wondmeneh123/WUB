import React, { useState } from "react";

const Add = () => {
  const [item, setItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    address: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setItem((prev) => ({
      ...prev,
      image: file,
    }));
    setPreview(URL.createObjectURL(file)); // Create a URL for preview
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission and image upload logic here
    console.log(item);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="name"
            >
              Item Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={item.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter item name"
              required
            />
          </div>

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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Enter item description"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={item.price}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter item price"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="price"
            >
              Address
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={item.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter item Address"
              required
            />
          </div>

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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Perfume">Perfume</option>
              <option value="Lotiond">Lotiond</option>
              <option value="Facial">Facial</option>
              <option value="Treatment">Treatment</option>
              <option value="Hair">Hair</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="image"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Image Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#0f172a] text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Item
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={() =>
                setItem({
                  name: "",
                  description: "",
                  price: "",
                  category: "",
                  image: null,
                })
              }
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
