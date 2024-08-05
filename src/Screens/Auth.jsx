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
    <div className="login-page">
      <p>Sign In With Google to Continue</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign In With Google
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};
