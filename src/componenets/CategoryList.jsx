import PropTypes from "prop-types";

const CategoryList = ({
  categories,
  selectedCategory,
  handleCategoryClick,
}) => {
  return (
    <div className="flex overflow-x-auto gap-4 px-4 py-4 no-scrollbar">
      {categories.map((cate) => (
        <div
          key={cate.name}
          onClick={() => handleCategoryClick(cate.name)}
          className="flex flex-col items-center min-w-[70px] cursor-pointer transition-all active:scale-95"
        >
          {/* Circular Icon Container */}
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-sm border transition-all duration-300 ${
              selectedCategory === cate.name
                ? "bg-[#d43790] text-white border-[#d43790] scale-110"
                : "bg-white text-gray-600 border-pink-50" //  border-pink-50
            }`}
          >
            {cate.icon}
          </div>

          {/* Category Label */}
          <p
            className={`text-[11px] mt-2 font-medium text-center transition-colors ${
              selectedCategory === cate.name
                ? "text-[#d43790] font-bold"
                : "text-gray-500"
            }`}
          >
            {cate.name}
          </p>
        </div>
      ))}
    </div>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
    })
  ).isRequired,
  selectedCategory: PropTypes.string,
  handleCategoryClick: PropTypes.func.isRequired,
};

export default CategoryList;
