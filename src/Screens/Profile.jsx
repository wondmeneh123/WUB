import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIos, MdSettings } from "react-icons/md"; // Added icons
import { db } from "../fb";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [authUserID, setAuthUserID] = useState(null);

  // 1. Load User Authentication Data from LocalStorage
  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const parsedUser = JSON.parse(authData);
      setUser(parsedUser);
      setAuthUserID(parsedUser?.userID);
    }
  }, []);

  // 2. Fetch Products Posted by the Specific User from Firestore
  useEffect(() => {
    const fetchItems = async (userID) => {
      if (!userID) return;
      try {
        const q = query(
          collection(db, "products"),
          where("userID", "==", userID)
        );
        const querySnapshot = await getDocs(q);
        const fetchedItems = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(fetchedItems);
      } catch (error) {
        console.error("Error fetching items: ", error);
      }
    };

    if (authUserID) {
      fetchItems(authUserID);
    }
  }, [authUserID]);

  // 3. Navigation Helper
  const showItemDetail = (item) => {
    navigate(`/item/${item.id}`, { state: { item } });
  };

  if (!user)
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E91E63]"></div>
      </div>
    );

  return (
    <div className="bg-white min-h-screen pb-24 font-sans">
      {/* 1. Header Area - Synced with other screens */}
      <div className="pt-8 px-4 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 bg-gray-50 rounded-full text-gray-600 hover:text-pink-600 active:scale-90 transition-all"
            >
              <MdArrowBackIos size={20} className="ml-1" />
            </button>
            <h1 className="text-3xl font-black text-[#E91E63] tracking-tight">
              Profile
            </h1>
          </div>

          {/* Settings icon as an extra touch */}
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <MdSettings size={24} />
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        {/* 2. User Identity Card */}
        <div className="flex flex-col items-center bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-100/50 relative overflow-hidden">
          {/* Decorative Background Circle */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-50 rounded-full opacity-50"></div>

          <div className="relative">
            <img
              src={
                user.profilePhoto ||
                "https://img.freepik.com/premium-vector/portrait-avatar-male-laughter-joy-smile-calmness-diversity-personage_147933-10265.jpg"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover z-10 relative"
            />
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
          </div>

          <h2 className="font-black text-2xl mt-4 text-gray-800">
            {user.name}
          </h2>
          <p className="text-gray-400 font-bold text-sm uppercase tracking-widest mt-1">
            {user.occupation || "WUB Member"}
          </p>

          {/* 3. Profile Statistics */}
          <div className="flex w-full mt-8 pt-6 border-t border-gray-50">
            <div className="flex-1 text-center border-r border-gray-50">
              <h3 className="font-black text-xl text-gray-800">
                {items.length}
              </h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                Ads Posted
              </p>
            </div>
            <div className="flex-1 text-center">
              <h3 className="font-black text-xl text-gray-800">4.8</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                User Rating
              </p>
            </div>
          </div>
        </div>

        {/* 4. Listings Grid Header */}
        <div className="mt-10 flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-gray-800">Your Listings</h3>
          <span className="text-xs font-bold text-pink-500 bg-pink-50 px-3 py-1 rounded-full">
            Recent first
          </span>
        </div>

        {/* 5. Listings Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[1.5rem] border border-gray-100 shadow-lg shadow-gray-100/30 overflow-hidden cursor-pointer active:scale-95 transition-all"
                onClick={() => showItemDetail(item)}
              >
                <div className="h-40 relative">
                  <img
                    src={
                      item.images?.[0] ||
                      "https://via.placeholder.com/300x300?text=No+Image"
                    }
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <p className="text-[10px] font-black text-[#E91E63]">
                      {item.price?.toLocaleString()} Br
                    </p>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-bold text-gray-800 text-sm truncate">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-medium mt-1 uppercase tracking-tighter truncate">
                    {item.category || "General"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
            <p className="text-gray-400 font-bold italic">No ads posted yet.</p>
            <button
              onClick={() => navigate("/add")}
              className="mt-4 text-[#E91E63] font-black text-sm uppercase underline tracking-widest"
            >
              Post First Ad
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
