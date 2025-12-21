// C:\Users\DrDj92\Desktop\holistic\WUB\src\Screens\ProductReviews.jsx
import { useState } from "react";
import { MdStar, MdClose, MdSend } from "react-icons/md";

const ProductReviews = ({ reviews = [] }) => {
  const [showForm, setShowForm] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [comment, setComment] = useState("");

  const defaultReviews = [
    {
      id: 1,
      user: "Sara A.",
      rating: 5,
      comment: "This product is amazing, I highly recommend it!",
      date: "Dec 15, 2024",
    },
    {
      id: 2,
      user: "Yonas K.",
      rating: 4,
      comment: "Very good quality, though delivery took a bit longer.",
      date: "Dec 10, 2024",
    },
  ];

  const displayReviews =
    reviews && reviews.length > 0 ? reviews : defaultReviews;

  // Rating Summary Calculation
  const totalReviews = displayReviews.length;
  const averageRating = (
    displayReviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews
  ).toFixed(1);

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: displayReviews.filter((r) => r.rating === star).length,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to send review to your backend can go here
    alert(`Thank you!\nRating: ${userRating} Stars\nComment: ${comment}`);
    setShowForm(false);
    setComment("");
  };

  return (
    <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mt-6 mb-10 relative">
      <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 text-lg">
        Customer Reviews
      </h3>

      {/* --- Rating Summary Section --- */}
      <div className="flex flex-col sm:flex-row gap-8 mb-8 pb-6 border-b border-gray-50">
        <div className="text-center sm:text-left">
          <h1 className="text-5xl font-black text-gray-900">{averageRating}</h1>
          <div className="flex text-amber-400 my-2 justify-center sm:justify-start">
            {[...Array(5)].map((_, i) => (
              <MdStar
                key={i}
                size={20}
                className={
                  i < Math.round(averageRating)
                    ? "text-amber-400"
                    : "text-gray-200"
                }
              />
            ))}
          </div>
          <p className="text-gray-500 text-sm">{totalReviews} Reviews</p>
        </div>

        <div className="flex-1 space-y-2">
          {ratingCounts.map((item) => (
            <div key={item.star} className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-600 w-3">
                {item.star}
              </span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${(item.count / totalReviews) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-400 w-6">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- Review Form --- */}
      {showForm ? (
        <div className="bg-pink-50/50 p-5 rounded-2xl mb-8 border border-pink-100 animate-in fade-in duration-300">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-pink-700 text-sm">Write a Review</h4>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-pink-600"
            >
              <MdClose size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium">
                Your Rating:
              </p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setUserRating(star)}
                    className="transition-transform active:scale-125"
                  >
                    <MdStar
                      size={28}
                      className={
                        star <= userRating ? "text-amber-400" : "text-gray-200"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this product..."
                className="w-full p-3 rounded-xl border border-pink-100 text-sm focus:ring-2 focus:ring-pink-300 focus:border-transparent outline-none min-h-[100px]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-pink-700 transition-all shadow-md shadow-pink-100"
            >
              <MdSend size={18} /> Submit Review
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="w-full mb-8 py-4 border-2 border-pink-50 text-pink-600 rounded-2xl text-sm font-bold hover:bg-pink-50 transition-all active:scale-95"
        >
          Write a Review
        </button>
      )}

      {/* --- Individual Reviews List --- */}
      <div className="space-y-6">
        {displayReviews.map((rev) => (
          <div
            key={rev.id}
            className="border-b border-gray-50 pb-4 last:border-0"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-bold text-sm text-gray-800 block">
                  {rev.user}
                </span>
                <div className="flex text-amber-400 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <MdStar
                      key={i}
                      size={14}
                      className={
                        i < rev.rating ? "text-amber-400" : "text-gray-200"
                      }
                    />
                  ))}
                </div>
              </div>
              <span className="text-[10px] text-gray-400 font-medium">
                {rev.date || "Just now"}
              </span>
            </div>
            <p className="text-gray-600 text-xs leading-relaxed">
              {rev.comment}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductReviews;
