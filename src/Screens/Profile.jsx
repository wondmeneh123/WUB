import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIos, MdLogout, MdDelete, MdEdit } from "react-icons/md";
import { db } from "../fb";
import LogoutModal from "../componenets/LogoutModal";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [authUserID, setAuthUserID] = useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const parsedUser = JSON.parse(authData);
      setUser(parsedUser);
      setAuthUserID(parsedUser?.userID);
    }
  }, []);

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

  useEffect(() => {
    if (authUserID) fetchItems(authUserID);
  }, [authUserID]);

  const handleDelete = async (itemId, e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "products", itemId));
        setItems(items.filter((item) => item.id !== itemId));
      } catch (error) {
        alert("Error deleting item: " + error.message);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  if (!user)
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E91E63]"></div>
      </div>
    );

  return (
    <div className="bg-white min-h-screen pb-24 font-sans">
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />

      <div className="pt-8 px-4 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 bg-gray-50 rounded-full text-gray-600 active:scale-90 transition-all"
            >
              <MdArrowBackIos size={20} className="ml-1" />
            </button>
            <h1 className="text-3xl font-black text-[#E91E63] tracking-tight">
              Profile
            </h1>
          </div>
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="p-2 bg-pink-50 text-[#E91E63] rounded-full hover:bg-pink-100 transition-colors"
          >
            <MdLogout size={22} />
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        <div className="flex flex-col items-center bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-100/50 relative overflow-hidden mb-10">
          <img
            src={
              user.profilePhoto ||
              "https://img.freepik.com/premium-vector/portrait-avatar-male-laughter-joy-smile-calmness-diversity-personage_147933-10265.jpg"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover z-10 relative"
          />
          <h2 className="font-black text-2xl mt-4 text-gray-800">
            {user.name}
          </h2>
          <p className="text-gray-400 font-bold text-sm uppercase tracking-widest mt-1">
            {user.occupation || "WUB Member"}
          </p>

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
                Rating
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-black text-gray-800 mb-6">Your Listings</h3>

        {items.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {items.map((item) => (
              /* የካርዱ መጀመሪያ - relative መሆኑን እርግጠኛ ሁን */
              <div
                key={item.id}
                className="bg-white rounded-[1.5rem] border border-gray-100 shadow-lg overflow-hidden cursor-pointer active:scale-95 transition-all relative"
                onClick={() =>
                  navigate(`/item/${item.id}`, { state: { item } })
                }
              >
                {/* 1. Action Buttons - አሁን ካርዱ ላይ (ከምስሉ ውጭ) ተቀምጠዋል */}
                <div
                  className="absolute top-3 right-3 flex flex-col gap-2 z-[50]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/edit-product/${item.id}`, { state: { item } });
                    }}
                    className="p-2.5 bg-white/95 text-blue-600 rounded-full shadow-2xl border border-gray-100 active:scale-90 transition-all flex items-center justify-center"
                  >
                    <MdEdit size={20} />
                  </button>
                  <button
                    onClick={(e) => handleDelete(item.id, e)}
                    className="p-2.5 bg-white/95 text-red-600 rounded-full shadow-2xl border border-gray-100 active:scale-90 transition-all flex items-center justify-center"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>

                {/* 2. Image Section */}
                <div className="h-40 relative z-10">
                  <img
                    src={
                      item.images?.[0] ||
                      "https://via.placeholder.com/300x300?text=No+Image"
                    }
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-[#E91E63] text-white px-2 py-1 rounded-lg shadow-md z-20">
                    <p className="text-[10px] font-black">
                      {item.price?.toLocaleString()} Br
                    </p>
                  </div>
                </div>

                <div className="p-3 text-center relative z-10">
                  <h4 className="font-bold text-gray-800 text-sm truncate">
                    {item.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-[2rem]">
            <p className="text-gray-400 font-bold italic">No ads posted yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
