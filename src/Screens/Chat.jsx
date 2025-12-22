import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoMdSend } from "react-icons/io";

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { storeName, item } = location.state || { storeName: "Seller" };

  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "seller" },
  ]);

  // Auto-scroll logic
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // Jiji-style Quick Replies
  const quickReplies = [
    "Is this available?",
    "What is the last price?",
    "Make an offer",
    "Where is your location?",
  ];

  const handleSendMessage = (textToSend) => {
    const finalMsg = typeof textToSend === "string" ? textToSend : message;
    if (finalMsg.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      text: finalMsg,
      sender: "user",
    };

    setChatHistory((prev) => [...prev, newMessage]);
    setMessage(""); // Clear input
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b sticky top-0 z-10">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="text-pink-600">
            <IoIosArrowBack size={24} />
          </button>
          <div className="ml-3">
            <h2 className="font-bold text-gray-800 leading-tight">
              {storeName}
            </h2>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-[10px] text-gray-500 font-bold uppercase">
                Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Card Preview */}
      {item && (
        <div className="bg-white p-2 border-b flex items-center gap-3">
          <img
            src={item.image || item.images?.[0]}
            alt=""
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="flex-1">
            <p className="text-xs font-bold text-gray-800 truncate">
              {item.name}
            </p>
            <p className="text-xs text-pink-600 font-black">ETB {item.price}</p>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col">
        {chatHistory.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
              msg.sender === "user"
                ? "bg-pink-600 text-white self-end rounded-tr-none"
                : "bg-white text-gray-800 self-start rounded-tl-none border border-gray-100"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Quick Replies Section */}
      <div className="px-4 py-2 bg-white flex gap-2 overflow-x-auto no-scrollbar">
        {quickReplies.map((reply, index) => (
          <button
            key={index}
            onClick={() => handleSendMessage(reply)}
            className="whitespace-nowrap bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-xs font-bold border border-gray-200 active:bg-pink-50 active:text-pink-600 active:border-pink-200 transition-colors"
          >
            {reply}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t flex items-center gap-2 pb-8">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type a message..."
          className="flex-1 bg-gray-100 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-pink-500 outline-none"
        />
        <button
          onClick={() => handleSendMessage()}
          className="bg-pink-600 text-white p-3 rounded-full shadow-lg active:scale-90 transition-transform"
        >
          <IoMdSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
