import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const RelatedProducts = ({ products, currentItem }) => {
  const navigate = useNavigate();

  // Filter products by the same category, excluding the one currently being viewed
  const related = products
    .filter(
      (p) => p.category === currentItem.category && p.id !== currentItem.id
    )
    .slice(0, 6);

  // If no related products are found, don't render anything
  if (related.length === 0) return null;

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
              // Pass both the selected item and the full product list to the next route
              navigate(`/item/${prod.id}`, {
                state: { item: prod, allItems: products },
              });
              // Ensure the page scrolls to the top for the new product
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="min-w-[160px] max-w-[160px] bg-white rounded-2xl p-2 shadow-sm border border-gray-100 active:scale-95 transition-all cursor-pointer"
          >
            <div className="h-32 bg-gray-50 rounded-xl mb-2 overflow-hidden flex items-center justify-center">
              <img
                src={prod.image || (prod.images && prod.images[0])}
                alt={prod.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <h4 className="text-xs font-bold text-gray-800 truncate px-1">
              {prod.name}
            </h4>
            <p className="text-pink-600 font-bold text-xs mt-1 px-1">
              ETB {prod.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

RelatedProducts.propTypes = {
  products: PropTypes.array.isRequired,
  currentItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    category: PropTypes.string,
  }).isRequired,
};

export default RelatedProducts;
