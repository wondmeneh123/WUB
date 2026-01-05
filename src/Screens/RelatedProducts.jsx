import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const RelatedProducts = ({ products = [], currentItem }) => {
  const navigate = useNavigate();

  // Safety Check: If products is not an array, make it empty
  const allProducts = Array.isArray(products) ? products : [];

  // Filter with Case Insensitivity to be safe
  const related = allProducts
    .filter((p) => {
      const isSameCategory =
        p.category?.toLowerCase() === currentItem.category?.toLowerCase();
      const isNotCurrentItem = p.id !== currentItem.id;
      return isSameCategory && isNotCurrentItem;
    })
    .slice(0, 6);

  // LOG FOR DEBUGGING: Look at your console to see if products are arriving
  console.log("Total Products Received:", allProducts.length);
  console.log("Related Found:", related.length);

  if (related.length === 0) {
    return (
      <div className="mt-8 mb-12 px-2">
        <p className="text-gray-400 text-xs italic">
          No related products found in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 mb-12">
      <h3 className="text-lg font-extrabold text-gray-800 mb-4 px-1">
        Related Products
      </h3>

      <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
        {related.map((prod) => (
          <div
            key={prod.id}
            onClick={() => {
              navigate(`/item/${prod.id}`, {
                state: { item: prod, allItems: allProducts },
              });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="min-w-[160px] max-w-[160px] bg-white rounded-2xl p-2 shadow-sm border border-gray-100 active:scale-95 transition-all cursor-pointer"
          >
            <div className="h-32 bg-gray-50 rounded-xl mb-2 overflow-hidden flex items-center justify-center">
              <img
                src={
                  prod.image ||
                  (prod.images && prod.images[0]) ||
                  "https://via.placeholder.com/150"
                }
                alt={prod.name}
                className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h4 className="text-xs font-bold text-gray-800 truncate px-1">
              {prod.name}
            </h4>
            <p className="text-[#d43790] font-bold text-xs mt-1 px-1">
              ETB {prod.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

RelatedProducts.propTypes = {
  products: PropTypes.array,
  currentItem: PropTypes.object.isRequired,
};

export default RelatedProducts;
