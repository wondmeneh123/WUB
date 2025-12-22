import {
  MdNotificationsNone,
  MdMessage,
  MdSettingsSuggest,
  MdOutlineCircle,
  MdArrowBackIos,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: "Welcome to WUB Mart!",
      message:
        "Thank you for joining our marketplace. Start shopping or post your ads!",
      time: "2 hours ago",
      type: "system",
    },
    {
      id: 2,
      title: "New Message",
      message: "Someone is interested in your 'Skin Lotion' product.",
      time: "5 hours ago",
      type: "message",
    },
  ];

  return (
    <div className="bg-white min-h-screen pb-32 font-sans">
      {/* 1. Header Area - Synced with Add Product style */}
      <div className="pt-8 px-4 max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-gray-50 rounded-full text-gray-600 hover:text-pink-600 active:scale-90 transition-all"
          >
            <MdArrowBackIos size={20} className="ml-1" />
          </button>

          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-[#E91E63] tracking-tight">
              Notifications
            </h1>
            {notifications.length > 0 && (
              <span className="bg-pink-100 text-[#E91E63] text-sm font-bold px-3 py-1 rounded-full">
                {notifications.length}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Notifications List */}
      <div className="px-4 max-w-2xl mx-auto">
        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-100/40 flex gap-4 hover:border-pink-200 transition-all"
              >
                {/* Icon based on notification type */}
                <div
                  className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${
                    notif.type === "system"
                      ? "bg-blue-50 text-blue-500"
                      : "bg-pink-50 text-[#E91E63]"
                  }`}
                >
                  {notif.type === "system" ? (
                    <MdSettingsSuggest size={28} />
                  ) : (
                    <MdMessage size={28} />
                  )}
                </div>

                {/* Content Section */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-800 text-lg">
                      {notif.title}
                    </h3>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                      {notif.time}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                    {notif.message}
                  </p>

                  {/* Status Indicator */}
                  <div className="mt-3 flex items-center gap-1.5">
                    <MdOutlineCircle
                      className={
                        notif.type === "system"
                          ? "text-blue-400"
                          : "text-[#E91E63]"
                      }
                      size={8}
                    />
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                      {notif.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State - Shown when no notifications are available */
          <div className="flex flex-col items-center justify-center pt-20">
            <div className="bg-gray-50 p-10 rounded-full border border-gray-100">
              <MdNotificationsNone size={80} className="text-gray-200" />
            </div>
            <h3 className="mt-6 text-gray-800 font-black text-2xl">
              All caught up!
            </h3>
            <p className="text-gray-400 text-center px-10 mt-2 text-md">
              We'll let you know when something important happens!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
