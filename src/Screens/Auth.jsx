import { auth, provider } from "../fb";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUser } from "../hooks/useGetUser";
import { useState } from "react";

export const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUser();
  const [error, setError] = useState(null);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const authInfo = {
        userID: result.user.uid,
        name: result.user.displayName,
        profilePhoto: result.user.photoURL,
        isAuth: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      navigate("/product");
    } catch (error) {
      setError("Failed to sign in with Google. Please try again.");
      console.error("Error signing in with Google: ", error);
    }
  };

  if (isAuth) {
    return <Navigate to="/product" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          WUB
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Sign in with Google to continue
        </p>
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
          onClick={signInWithGoogle}
        >
          Sign In With Google
        </button>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};
