import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { db } from "../fb";
import PropTypes from "prop-types"; // 1. PropTypesን import አድርግ

const RelatedProducts = ({ currentItem }) => {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelated = async () => {
      if (!currentItem?.category) return;

      setLoading(true);
      try {
        const productsRef = collection(db, "products");
        const q = query(
          productsRef,
          where("category", "==", currentItem.category),
          limit(10)
        );

        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((p) => p.id !== currentItem.id)
          .slice(0, 6);

        setRelated(docs);
      } catch (error) {
        console.error("Related products fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [currentItem]);

  if (loading || related.length === 0) return null;

  return (
    <div className="mt-8 mb-12">
      <h3 className="text-lg font-extrabold text-gray-800 mb-4 px-1">
        ተመሳሳይ ምርቶች (Related Products)
      </h3>

      <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
        {related.map((prod) => (
          <div
            key={prod.id}
            onClick={() => {
              navigate("/item-detail", { state: { item: prod } });
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

// 2. የ Props Validation እዚህ ጋር ጨምር
RelatedProducts.propTypes = {
  currentItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
};

export default RelatedProducts;
