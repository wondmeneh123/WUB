import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../fb"; // Importing auth and db from ../fb

const Profile = () => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from localStorage
    const authData = localStorage.getItem("auth");
    const photo = localStorage.getItem("profilePhoto");

    if (authData) {
      setUser(JSON.parse(authData)); // Parse the JSON string into an object
    }

    if (photo) {
      setProfilePhoto(photo); // Set the profile photo from localStorage
    }

    // Fetch items data from Firestore where userId matches the logged-in user
    const fetchItems = async () => {
      try {
        const q = query(
          collection(db, "products"),
          where("userID", "==", user?.userID) // Adjust as necessary
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

    if (user) {
      fetchItems();
    }
  }, [user]);

  // Function to handle item detail display
  const showItemDetail = (item) => {
    // Implement item detail logic here
    navigate(`/item/${item.id}`, { state: { item } });
  };

  if (!user) return <div>Loading...</div>; // Display loading if user data is not yet fetched

  return (
    <div className="bg-white">
      <div className="fixed top-0 left-0 right-0 flex justify-center items-center bg-white ">
        <h2 className="font-bold text-xl my-3 text-center">Profile</h2>
      </div>
      <div className="flex mt-10 flex-col justify-center items-center pt-10">
        <img
          width={150}
          height={150}
          src={
            user.profilePhoto ||
            "https://img.freepik.com/premium-vector/portrait-avatar-male-laughter-joy-smile-calmness-diversity-personage_147933-10265.jpg?ga=GA1.1.1931341189.1721541823&semt=ais_hybrid"
          }
          alt="Profile"
          className="rounded-full"
        />
        <h2 className="font-bold text-3xl">{user.name}</h2>
        <h3 className="text-2xl">{user.occupation}</h3>
      </div>
      <div className="flex justify-around px-3 py-4 bg-[#d43790] text-white m-5 rounded-2xl">
        <h3 className="font-bold text-xl">20 Ads posted</h3>
        <h3 className="font-bold text-xl">4.8 Rating</h3>
      </div>
      <div className="mx-5">
        <h3 className="my-3">{user.name}'s Ads</h3>
        <div className="px-4 text-xl font-semibold flex flex-col">
          <div className="columns-2 gap-4 bg-white">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-lg  p-4 rounded-xl mb-4 cursor-pointer break-inside-avoid"
                onClick={() => showItemDetail(item)}
              >
                <img
                  src={item.image}
                  width={200}
                  alt={item.name}
                  className="w-full rounded-2xl cursor-pointer"
                />
                <div className="mt-2">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm text-gray-500 truncate">
                    {item.description}
                  </p>
                  <p className="text-lg font-semibold text-[#d43790]">
                    {item.price} Br
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
