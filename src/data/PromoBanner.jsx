const PromoBanner = () => {
  const promoData = [
    {
      src: "https://img.freepik.com/free-photo/cosmetic-products-with-flower-petals_23-2148890413.jpg",
      discount: "20% OFF",
      title: "Skincare",
      oldPrice: 1200,
      newPrice: 960,
    },
    {
      src: "https://img.freepik.com/free-photo/top-view-cosmetic-bottles-with-flowers_23-2148511794.jpg",
      discount: "15% OFF",
      title: "Organic",
      oldPrice: 850,
      newPrice: 720,
    },
    {
      src: "https://img.freepik.com/free-photo/flat-lay-beauty-products-arrangement_23-2148443026.jpg",
      discount: "HOT DEAL",
      title: "Makeup",
      oldPrice: 500,
      newPrice: 350,
    },
    {
      src: "https://images.unsplash.com/photo-1596462502278-27bfad450526?auto=format&fit=crop&q=80&w=500",
      discount: "30% OFF",
      title: "Hair Care",
      oldPrice: 1500,
      newPrice: 1050,
    },
    {
      src: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=500",
      discount: "SALE",
      title: "Serums",
      oldPrice: 900,
      newPrice: 650,
    },
    {
      src: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=500",
      discount: "25% OFF",
      title: "Body Lotion",
      oldPrice: 700,
      newPrice: 525,
    },
    {
      src: "https://images.unsplash.com/photo-1590439474822-b4b60b9480bc?auto=format&fit=crop&q=80&w=500",
      discount: "NEW",
      title: "Eye Care",
      oldPrice: 1100,
      newPrice: 880,
    },
    {
      src: "https://images.unsplash.com/photo-1598440494883-7c9b2d867761?auto=format&fit=crop&q=80&w=500",
      discount: "LIMITED",
      title: "Face Masks",
      oldPrice: 450,
      newPrice: 315,
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
        <span className="text-[10px] text-pink-500 font-bold bg-pink-50 px-3 py-1 rounded-full animate-bounce">
          Swipe {">>"}
        </span>
      </div>

      {/* Horizontal Scrolling Promo List */}
      <div className="flex overflow-x-auto gap-4 px-4 no-scrollbar pb-4">
        {promoData.map((promo, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-36 h-48 overflow-hidden rounded-[28px] shadow-md border border-pink-50 group"
          >
            {/* Promo Product Image */}
            <img
              src={promo.src}
              alt={promo.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Dark Gradient Overlay for Better Visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

            {/* Floating Discount Badge */}
            <div className="absolute top-3 right-3 bg-[#d43790] text-white text-[9px] font-black px-2 py-1 rounded-lg shadow-lg">
              {promo.discount}
            </div>

            {/* Product Details Section */}
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <span className="text-[10px] font-bold text-pink-300 uppercase tracking-tighter">
                {promo.title}
              </span>

              <div className="flex items-baseline gap-2 mt-1">
                {/* Current Discounted Price */}
                <p className="text-white text-sm font-black">
                  {promo.newPrice} <span className="text-[8px]">ETB</span>
                </p>

                {/* Original Price with Strikethrough - AliExpress Style */}
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
