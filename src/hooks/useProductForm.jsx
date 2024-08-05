import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAddProduct } from "../hooks/useAddProduct";
import { useGetUser } from "../hooks/useGetUser";
import { storage } from "../fb";

const useProductForm = () => {
  const { addProduct } = useAddProduct();
  const { userID } = useGetUser();
  const [item, setItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    address: "",
    image: null,
    productStatus: "",
  });
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setItem((prev) => ({
      ...prev,
      image: file,
    }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      let imageUrl = "";
      if (item.image) {
        const storageRef = ref(storage, `images/${item.image.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, item.image);
        imageUrl = await getDownloadURL(uploadTask.ref);
      }

      const newItem = {
        ...item,
        price: parseFloat(item.price),
        image: imageUrl,
        userID,
      };

      await addProduct(newItem);
      setItem({
        name: "",
        description: "",
        price: "",
        category: "",
        address: "",
        image: null,
        productStatus: "",
      });
      setPreview(null);
    } catch (error) {
      console.error("Error adding item: ", error);
    } finally {
      setUploading(false);
    }
  };

  return {
    item,
    preview,
    uploading,
    handleChange,
    handleImageChange,
    handleSubmit,
  };
};

export default useProductForm;
