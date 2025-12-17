// src/Screens/Notifications.jsx
// Removed the unused 'React' import to fix the first error

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "Welcome to WUB!",
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
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm py-4 z-10 border-b">
        <h2 className="font-bold text-xl text-center text-gray-800">
          Notifications
        </h2>
      </div>

      <div className="pt-20 px-4">
        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className="bg-white p-4 rounded-2xl shadow-sm border border-pink-50 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-800 text-lg">
                    {notif.title}
                  </h3>
                  <span className="text-[10px] text-gray-400 font-medium italic">
                    {notif.time}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                  {notif.message}
                </p>
                <div className="mt-3 flex items-center">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      notif.type === "system" ? "bg-blue-400" : "bg-pink-500"
                    }`}
                  ></div>
                  <span className="text-[10px] text-gray-400 ml-2 uppercase tracking-widest">
                    {notif.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-20">
            <div className="bg-pink-100 p-6 rounded-full">
              <span className="text-4xl">🔔</span>
            </div>
            <h3 className="mt-4 text-gray-800 font-bold text-lg">
              No Notifications
            </h3>
            <p className="text-gray-500 text-center px-10 mt-2">
              {/* Fixed the unescaped entity error by using &apos; */}
              We&apos;ll let you know when something important happens!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
