// src/Screens/Profile.jsx
import { useState, useEffect } from "react"; // Removed 'React'
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../fb";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  // We'll use a local variable to store the parsed auth data temporarily
  const [authUserID, setAuthUserID] = useState(null);

  // --- 1. Fetch User Data (Runs once) ---
  useEffect(() => {
    // Fetch user data from localStorage
    const authData = localStorage.getItem("auth");
    // const photo = localStorage.getItem("profilePhoto"); // Removed 'photo' as it was unused.

    if (authData) {
      const parsedUser = JSON.parse(authData);
      setUser(parsedUser);
      // Set the UserID in a separate state dependency for the next useEffect
      setAuthUserID(parsedUser?.userID);
    }
  }, []); // Run only once on mount

  // --- 2. Fetch Items Data (Runs when authUserID changes) ---
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
          <h3 className="font-bold text-xl">{items.length}</h3>
          <p className="text-sm">Ads Posted</p>
        </div>
        <div className="text-center">
          {/* Static Rating value, you might want to fetch this later */}
          <h3 className="font-bold text-xl">4.8</h3>
          <p className="text-sm">Rating</p>
        </div>
      </div>

      {/* User's Ads */}
      <div className="mx-5 mt-6 mb-16">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          {user.name}&apos;s Ads
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-15">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => showItemDetail(item)}
            >
              <img
                height={100}
                width={100}
                src={
                  item.image
                    ? item.image
                    : "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg"
                }
                alt={item.name || "Product"}
                className="w-full w rounded-2xl cursor-pointer"
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
          {/* Display message if no items are found */}
          {items.length === 0 && (
            <p className="text-gray-500 col-span-2 text-center mt-4">
              You haven&apos;t posted any ads yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
