// src/componenets/ChatButton.jsx
import { MdChat } from "react-icons/md";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ChatButton = ({ storeName, item }) => {
  const navigate = useNavigate();

  const handleStartChat = () => {
    // Navigates to the chat page and passes the store name and the item data
    navigate("/chat", { state: { storeName, item } });
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
          <h4 className="font-bold text-gray-800 text-sm">Chat with Seller</h4>
          <p className="text-[11px] text-gray-500">
            Typically replies in 5 mins
          </p>
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
  item: PropTypes.object, // Passing the whole item object is better for the preview card
};

export default ChatButton;
