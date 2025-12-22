// src/componenets/ChatButton.jsx
import { MdChat } from "react-icons/md";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ChatButton = ({ storeName, productId }) => {
  const navigate = useNavigate();

  const handleStartChat = () => {
    // እዚህ ጋር ወደ ቻት ገጽ ይወስደዋል
    // ዳታውን (Store Name እና Product ID) በ state እናልፋለን
    navigate("/chat", { state: { storeName, productId } });
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="bg-pink-100 p-3 rounded-full text-pink-600">
            <MdChat size={24} />
          </div>
          {/* Online Indicator Dot */}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
        <div>
          <h4 className="font-bold text-gray-800 text-sm">ከሻጩ ጋር ይወያዩ</h4>
          <p className="text-[11px] text-gray-500">በአማካይ በ 5 ደቂቃ ውስጥ ይመልሳሉ</p>
        </div>
      </div>

      <button
        onClick={handleStartChat}
        className="bg-pink-50 text-pink-600 px-6 py-2.5 rounded-xl text-sm font-bold border border-pink-100 active:scale-95 transition-all"
      >
        START CHAT
      </button>
    </div>
  );
};

ChatButton.propTypes = {
  storeName: PropTypes.string,
  productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ChatButton;
