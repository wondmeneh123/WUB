import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../fb"; // Importing db from ../fb

const Profile = () => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from localStorage
    const authData = localStorage.getItem("auth");
    const photo = localStorage.getItem("profilePhoto");

    if (authData) {
      setUser(JSON.parse(authData)); // Parse the JSON string into an object
    }

    // Fetch items data from Firestore where userId matches the logged-in user
    const fetchItems = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, "products"),
          where("userID", "==", user?.userID)
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

    fetchItems();
  }, [user]);

  // Function to handle item detail display
  const showItemDetail = (item) => {
    navigate(`/item/${item.id}`, { state: { item } });
  };

  if (!user)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Profile Header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md py-3 z-10">
        <h2 className="font-bold text-xl text-center text-gray-800">Profile</h2>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col items-center pt-20 ">
        <img
          width={120}
          height={120}
          src={
            user.profilePhoto ||
            "https://img.freepik.com/premium-vector/portrait-avatar-male-laughter-joy-smile-calmness-diversity-personage_147933-10265.jpg?ga=GA1.1.1931341189.1721541823&semt=ais_hybrid"
          }
          alt="Profile"
          className="rounded-full shadow-md"
        />
        <h2 className="font-bold text-2xl mt-4 text-gray-800">{user.name}</h2>
        <h3 className="text-lg text-gray-600">{user.occupation}</h3>
      </div>

      {/* Profile Stats */}
      <div className="flex justify-around mx-5 py-4 mt-6 bg-pink-500 text-white rounded-xl shadow-md">
        <div className="text-center">
          <h3 className="font-bold text-xl">20</h3>
          <p className="text-sm">Ads Posted</p>
        </div>
        <div className="text-center">
          <h3 className="font-bold text-xl">4.8</h3>
          <p className="text-sm">Rating</p>
        </div>
      </div>

      {/* User's Ads */}
      <div className="mx-5 mt-6 mb-16">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          {user.name}'s Ads
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-15">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => showItemDetail(item)}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <p className="font-bold text-gray-800 truncate">{item.name}</p>
                <p className="text-sm text-gray-500 truncate">
                  {item.description}
                </p>
                <p className="text-lg font-bold text-pink-500 mt-2">
                  {item.price} Br
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
