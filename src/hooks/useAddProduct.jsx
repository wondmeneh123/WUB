import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../fb";
import { useGetUser } from "./useGetUser";

export const useAddProduct = () => {
  const productCollectionRef = collection(db, "products");
  const { userID } = useGetUser();

  /**
   * addProduct accepts a full product object. Expected shape:
   * { name, description, price, category, address, images, skinType, ingredients, howToUse, badges }
   */
  const addProduct = async (product) => {
    const {
      name = "",
      description = "",
      price = 0,
      category = "",
      address = "",
      images = [],
      skinType = "All",
      ingredients = "",
      howToUse = "",
      badges = "",
    } = product || {};

    const payload = {
      userID,
      name,
      description,
      price: typeof price === "string" ? parseFloat(price) || 0 : price,
      category,
      address,
      images,
      skinType,
      ingredients,
      howToUse,
      badges,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(productCollectionRef, payload);
    return docRef;
  };

  return { addProduct };
};
