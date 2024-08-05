import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../fb";
import { useGetUser } from "./useGetUser";

export const useAddProduct = () => {
  const productCollectionRef = collection(db, "products");
  const { userID } = useGetUser();

  const addProduct = async ({
    name,
    description,
    price,
    category,
    address,
    image,
  }) => {
    await addDoc(productCollectionRef, {
      userID,
      name,
      description,
      price,
      category,
      address,
      image,
      createdAt: serverTimestamp(),
    });
  };

  return { addProduct };
};
