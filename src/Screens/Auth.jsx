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
      navigate("/shop");
    } catch (error) {
      setError("Failed to sign in with Google. Please try again.");
      console.error("Error signing in with Google: ", error);
    }
  };

  if (isAuth) {
    return <Navigate to="/shop" />;
  }

  return (
    <div className="flex items-center justify-center p-3 min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full text-center ">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to WUBMart
        </h2>
        <p className="text-gray-600 mb-8">
          Sign in with your Google account to explore exclusive deals and
          offers!
        </p>

        {/* Sign-In Button */}
        <button
          className="w-full bg-pink-500 text-white py-3 rounded-lg shadow-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75 transition duration-300 flex items-center justify-center"
          onClick={signInWithGoogle}
        >
          Sign In with Google
        </button>

        {/* Error Message */}
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        {/* Footer */}
        <p className="mt-6 text-sm text-gray-500">
          By signing in, you agree to our{" "}
          <a href="/terms" className="text-blue-500 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};
