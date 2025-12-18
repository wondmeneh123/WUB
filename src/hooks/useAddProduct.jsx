import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../fb";
import { useGetUser } from "./useGetUser";

export const useAddProduct = () => {
  // Reference to the 'products' collection in Firestore
  const productCollectionRef = collection(db, "products");
  const { userID } = useGetUser();

  /**
   * Function to add a new product to Firestore.
   * Accepts a 'data' object containing product details (name, price, skinType, ingredients, images, etc.)
   */
  const addProduct = async (data) => {
    try {
      // Add a new document with the spread data, current userID, and a server-side timestamp
      await addDoc(productCollectionRef, {
        ...data, // Spreads all fields like skinType, ingredients, images array, etc.
        userID,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      // Log error if the operation fails
      console.error("Error adding document to Firestore: ", error);
      throw error;
    }
  };

  return { addProduct };
};
