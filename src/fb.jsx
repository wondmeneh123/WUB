// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCOYmAwyM9OiF3auMgp-vI0IFJswzIv1OE",
  authDomain: "dgd-learning-app.firebaseapp.com",
  projectId: "dgd-learning-app",
  storageBucket: "dgd-learning-app.appspot.com",
  messagingSenderId: "251713384477",
  appId: "1:251713384477:web:881e986ed90555c2f116f4",
  measurementId: "G-MCT37DYHPE",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
