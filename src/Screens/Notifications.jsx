// src/Screens/Notifications.jsx
import {
  MdNotificationsNone,
  MdMessage,
  MdSettingsSuggest,
  MdOutlineCircle,
} from "react-icons/md";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "Welcome to WUB ገበያ!",
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
    <div className="bg-gray-50 min-h-screen pb-32">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm py-5 z-20 border-b px-6">
        <h2 className="font-black text-xl text-gray-800 flex items-center gap-2">
          Notifications{" "}
          <span className="bg-pink-100 text-pink-600 text-xs px-2 py-0.5 rounded-full">
            {notifications.length}
          </span>
        </h2>
      </div>

      <div className="pt-24 px-4 max-w-2xl mx-auto">
        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className="bg-white p-4 rounded-2xl shadow-sm border border-transparent hover:border-pink-100 transition-all flex gap-4"
              >
                {/* Icon based on type */}
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    notif.type === "system"
                      ? "bg-blue-50 text-blue-500"
                      : "bg-pink-50 text-pink-500"
                  }`}
                >
                  {notif.type === "system" ? (
                    <MdSettingsSuggest size={24} />
                  ) : (
                    <MdMessage size={24} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-800 text-md">
                      {notif.title}
                    </h3>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">
                      {notif.time}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1 leading-snug">
                    {notif.message}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <MdOutlineCircle
                      className={
                        notif.type === "system"
                          ? "text-blue-400"
                          : "text-pink-500"
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
          /* Empty State */
          <div className="flex flex-col items-center justify-center pt-20">
            <div className="bg-white p-8 rounded-full shadow-inner border border-gray-100">
              <MdNotificationsNone size={60} className="text-gray-200" />
            </div>
            <h3 className="mt-6 text-gray-800 font-black text-xl">
              All caught up!
            </h3>
            <p className="text-gray-400 text-center px-10 mt-2 text-sm">
              We&apos;ll let you know when something important happens!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
