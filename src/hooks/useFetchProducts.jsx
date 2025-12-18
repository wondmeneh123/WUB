import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAddProduct } from "./useAddProduct";
import { useGetUser } from "./useGetUser";
import { storage } from "../fb";

const useProductForm = () => {
  const { addProduct } = useAddProduct();
  const { userID } = useGetUser();

  // 1. ሁሉንም የአፑን ዳታዎች እዚህ state ውስጥ እንይዛለን
  const [item, setItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    address: "",
    skinType: "All", // አዲስ የተጨመረ
    ingredients: "", // አዲስ የተጨመረ
    howToUse: "", // አዲስ የተጨመረ
    images: [], // ለብዙ ፎቶዎች የተስተካከለ
  });

  const [preview, setPreview] = useState([]); // ለብዙ ፎቶዎች preview
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 2. ብዙ ፎቶዎችን ለመቀበል የተስተካከለ
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("ከ 5 በላይ ፎቶ መምረጥ አይቻልም!");
      return;
    }
    setItem((prev) => ({ ...prev, images: files }));

    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setPreview(filePreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      // 3. ፎቶዎችን ወደ Firebase Storage መጫን
      const imageUrls = await Promise.all(
        item.images.map(async (file) => {
          const storageRef = ref(
            storage,
            `products/${Date.now()}_${file.name}`
          );
          const uploadTask = await uploadBytesResumable(storageRef, file);
          return await getDownloadURL(uploadTask.ref);
        })
      );

      // 4. ሁሉንም ዳታ በአንድ ላይ አደራጅቶ ወደ Firestore መላክ
      const newItem = {
        name: item.name,
        description: item.description,
        price: parseFloat(item.price),
        category: item.category,
        address: item.address,
        skinType: item.skinType, // አዲስ
        ingredients: item.ingredients, // አዲስ
        howToUse: item.howToUse, // አዲስ
        images: imageUrls, // የፎቶዎቹ ሊንክ
        userID,
        createdAt: new Date(),
      };

      await addProduct(newItem);

      // 5. ቅጹን ወደ ነበረበት መመለስ (Reset)
      setItem({
        name: "",
        description: "",
        price: "",
        category: "",
        address: "",
        skinType: "All",
        ingredients: "",
        howToUse: "",
        images: [],
      });
      setPreview([]);
      alert("ምርቱ በትክክል ተመዝግቧል!");
    } catch (error) {
      console.error("Error adding item: ", error);
      alert("ስህተት ተፈጥሯል፣ እባክዎ እንደገና ይሞክሩ።");
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
