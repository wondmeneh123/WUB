// src/Screens/Profile.jsx
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../fb";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [authUserID, setAuthUserID] = useState(null);

  // --- 1. Load User Authentication Data from LocalStorage ---
  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const parsedUser = JSON.parse(authData);
      setUser(parsedUser);
      setAuthUserID(parsedUser?.userID);
    }
  }, []);

  // --- 2. Fetch Products Posted by the Specific User from Firestore ---
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

  // --- 3. Function to Navigate to Item Details Page ---
  const showItemDetail = (item) => {
    navigate(`/item/${item.id}`, { state: { item } });
  };

  if (!user)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Header Section */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm py-3 z-10 border-b">
        <h2 className="font-bold text-xl text-center text-gray-800">Profile</h2>
      </div>

      {/* User Info Section (Photo, Name, Occupation) */}
      <div className="flex flex-col items-center pt-24">
        <div className="relative">
          <img
            width={120}
            height={120}
            src={
              user.profilePhoto ||
              "https://img.freepik.com/premium-vector/portrait-avatar-male-laughter-joy-smile-calmness-diversity-personage_147933-10265.jpg"
            }
            alt="Profile"
            className="rounded-full shadow-lg border-4 border-white w-28 h-28 object-cover"
          />
        </div>
        <h2 className="font-bold text-2xl mt-4 text-gray-800">{user.name}</h2>
        <h3 className="text-lg text-gray-500">{user.occupation || "Member"}</h3>
      </div>

      {/* Profile Statistics (Ads Count, Rating) */}
      <div className="flex justify-around mx-5 py-5 mt-8 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-2xl shadow-lg">
        <div className="text-center border-r border-pink-400 w-1/2">
          <h3 className="font-bold text-2xl">{items.length}</h3>
          <p className="text-xs uppercase tracking-wider opacity-80">
            Ads Posted
          </p>
        </div>
        <div className="text-center w-1/2">
          <h3 className="font-bold text-2xl">4.8</h3>
          <p className="text-xs uppercase tracking-wider opacity-80">Rating</p>
        </div>
      </div>

      {/* User's Ad Listings Grid */}
      <div className="mx-5 mt-10 mb-20">
        <h3 className="text-xl font-bold text-gray-800 mb-6 border-l-4 border-pink-500 pl-3">
          Your Listings
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              onClick={() => showItemDetail(item)}
            >
              <div className="h-40 overflow-hidden relative">
                {/* Displaying the first image from the array */}
                <img
                  src={
                    item.images && item.images.length > 0
                      ? item.images[0]
                      : "https://via.placeholder.com/300x300?text=No+Image"
                  }
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {/* Indicator for additional images */}
                {item.images && item.images.length > 1 && (
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-[10px] px-2 py-1 rounded-md">
                    +{item.images.length - 1} more
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="font-bold text-gray-800 truncate text-sm">
                  {item.name}
                </p>
                <p className="text-xs text-gray-400 truncate mt-1">
                  {item.description}
                </p>
                <p className="text-md font-extrabold text-pink-600 mt-2">
                  {item.price.toLocaleString()} Br
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Message */}
        {items.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-400 text-lg italic">
              You haven't posted any ads yet.
            </p>
            <button
              onClick={() => navigate("/add")}
              className="mt-4 text-pink-500 font-semibold underline"
            >
              Post your first ad
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
