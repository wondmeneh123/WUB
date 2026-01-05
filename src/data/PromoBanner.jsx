import { useNavigate } from "react-router-dom";
import { MdLocationOn } from "react-icons/md"; // Added location icon

const PromoBanner = () => {
  const navigate = useNavigate();

  // 1. FULL DATA LIST (8 Items) - Structured to match Shop.jsx
  // Images changed to high-quality Unsplash links for better compatibility
  const promoData = [
    {
      id: "p1",
      name: "Skincare Essential Kit",
      image:
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=500&auto=format&fit=crop",
      discount: "20% OFF",
      category: "Skincare",
      brand: "CeraVe",
      city: "Addis Ababa",
      price: 960,
      oldPrice: 1200,
      description:
        "Premium skincare set for daily routine. Includes cleanser and moisturizer.",
    },
    {
      id: "p2",
      name: "Organic Beauty Oils",
      image:
        "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=500&auto=format&fit=crop",
      discount: "15% OFF",
      category: "Organic",
      brand: "The Ordinary",
      city: "Bishoftu",
      price: 720,
      oldPrice: 850,
      description: "100% natural organic oils for glowing and healthy skin.",
    },
    {
      id: "p3",
      name: "Professional Makeup Set",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=500&auto=format&fit=crop",
      discount: "HOT DEAL",
      category: "Makeup",
      brand: "MAC",
      city: "Addis Ababa",
      price: 350,
      oldPrice: 500,
      description: "Long-lasting professional makeup collection for experts.",
    },
    {
      id: "p4",
      name: "Hair Repair Serum",
      image:
        "https://images.unsplash.com/photo-1527799822344-429dfa855dd7?q=80&w=500&auto=format&fit=crop",
      discount: "30% OFF",
      category: "Hair Care",
      brand: "Gucci",
      city: "Adama",
      price: 1050,
      oldPrice: 1500,
      description: "Deeply repairs damaged hair and adds natural shine.",
    },
    {
      id: "p5",
      name: "Night Recovery Cream",
      image:
        "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?q=80&w=500&auto=format&fit=crop",
      discount: "SALE",
      category: "Facial",
      brand: "Neutrogena",
      city: "Hawassa",
      price: 650,
      oldPrice: 900,
      description: "Overnight recovery cream for refreshed morning skin.",
    },
    {
      id: "p6",
      name: "Scented Body Lotion",
      image:
        "https://images.unsplash.com/photo-1552046122-03184de85e08?q=80&w=500&auto=format&fit=crop",
      discount: "25% OFF",
      category: "Body Care",
      brand: "OPI",
      city: "Bahir Dar",
      price: 525,
      oldPrice: 700,
      description: "Smooth and scented body lotion for 24h hydration.",
    },
    {
      id: "p7",
      name: "Eye Glow Serum",
      image:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=500&auto=format&fit=crop",
      discount: "NEW",
      category: "Eye Care",
      brand: "CeraVe",
      city: "Addis Ababa",
      price: 880,
      oldPrice: 1100,
      description: "Reduces dark circles and brightens the eye area.",
    },
    {
      id: "p8",
      name: "Hydrating Face Mask",
      image:
        "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=500&auto=format&fit=crop",
      discount: "LIMITED",
      category: "Facial",
      brand: "The Ordinary",
      city: "Bole, AA",
      price: 315,
      oldPrice: 450,
      description: "Deep hydration mask for dry and sensitive skin.",
    },
  ];

  return (
    <div className="mt-6 mb-10">
      {/* Promo Header Section */}
      <div className="px-4 mb-4 flex justify-between items-center">
        <div>
          <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">
            Special Offers
          </h3>
          <p className="text-[10px] text-gray-400 font-bold">
            {"Don't miss out on these deals"}
          </p>
        </div>
        <span className="text-[10px] text-pink-500 font-bold bg-pink-50 px-3 py-1 rounded-full animate-pulse">
          Swipe {">>"}
        </span>
      </div>

      {/* Horizontal Scrolling Promo List */}
      <div className="flex overflow-x-auto gap-4 px-4 no-scrollbar pb-4">
        {promoData.map((promo) => (
          <div
            key={promo.id}
            // Navigate and pass full item object for Details page to use
            onClick={() =>
              navigate(`/item/${promo.id}`, { state: { item: promo } })
            }
            className="relative flex-shrink-0 w-36 h-48 overflow-hidden rounded-[28px] shadow-md border border-pink-50 group cursor-pointer active:scale-95 transition-all duration-300"
          >
            {/* Promo Product Image */}
            <img
              src={promo.image}
              alt={promo.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Dark Gradient Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

            {/* Floating Discount Badge */}
            <div className="absolute top-3 right-3 bg-[#d43790] text-white text-[9px] font-black px-2 py-1 rounded-lg shadow-lg z-10">
              {promo.discount}
            </div>

            {/* Product Details Section */}
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              {/* Brand & Category */}
              <span className="text-[9px] font-bold text-pink-300 uppercase tracking-tighter">
                {promo.category} • {promo.brand}
              </span>

              {/* City/Location info */}
              <div className="flex items-center gap-0.5 text-gray-300 mb-1">
                <MdLocationOn size={8} />
                <span className="text-[8px] font-medium truncate">
                  {promo.city}
                </span>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-2">
                <p className="text-white text-sm font-black">
                  {promo.price} <span className="text-[8px]">ETB</span>
                </p>
                <p className="text-gray-400 text-[10px] line-through decoration-pink-600 decoration-[1.5px] font-bold opacity-80">
                  {promo.oldPrice}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoBanner;
