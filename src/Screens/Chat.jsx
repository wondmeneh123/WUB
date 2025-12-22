// src/Screens/Chat.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoMdSend } from "react-icons/io";

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { storeName } = location.state || { storeName: "Seller" };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Chat Header */}
      <div className="flex items-center p-4 bg-white border-b sticky top-0">
        <button onClick={() => navigate(-1)} className="text-pink-600">
          <IoIosArrowBack size={24} />
        </button>
        <div className="ml-3">
          <h2 className="font-bold text-gray-800">{storeName}</h2>
          <p className="text-[10px] text-green-500 font-bold uppercase tracking-tighter">
            Online
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="bg-pink-100 text-pink-800 p-3 rounded-2xl rounded-tl-none max-w-[80%] text-sm">
          ሰላም! እንዴት ልረዳዎት እችላለሁ?
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t flex items-center gap-2">
        <input
          type="text"
          placeholder="መልእክት ይጻፉ..."
          className="flex-1 bg-gray-100 border-none rounded-2xl px-4 py-3 text-sm focus:ring-1 focus:ring-pink-500"
        />
        <button className="bg-pink-600 text-white p-3 rounded-full shadow-lg">
          <IoMdSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
