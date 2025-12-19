import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAddProduct } from "./useAddProduct";
import { useGetUser } from "./useGetUser";
import { storage } from "../fb";

// Upload a single file with progress callback (index optional)
const uploadFile = (file, onProgress) => {
  const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        if (onProgress) onProgress(progress);
      },
      (error) => reject(error),
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
};

const useProductForm = () => {
  const { addProduct } = useAddProduct();
  const { userID } = useGetUser();

  const [item, setItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    address: "",
    images: [], // File objects when selecting
    skinType: "All", // Oily, Dry, Sensitive, All
    ingredients: "",
    howToUse: "",
    badges: "", // New | Sale | Out of Stock
  });

  const [preview, setPreview] = useState([]); // blob URLs
  const [uploading, setUploading] = useState(false);
  const [perImageProgress, setPerImageProgress] = useState([]); // array of numbers
  const [overallProgress, setOverallProgress] = useState(0); // 0-100

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(0, 5);
    setItem((prev) => ({ ...prev, images: files }));

    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setPreview(filePreviews);
    setPerImageProgress(files.map(() => 0));
    setOverallProgress(0);
  };

  const handleSubmit = async (e) => {
    e && e.preventDefault && e.preventDefault();
    if (uploading) return;

    // Basic validation
    if (!item.name.trim()) return alert("Please enter product name.");
    if (!item.images || item.images.length === 0)
      return alert("Please select at least one image (max 5).");

    setUploading(true);
    setPerImageProgress(item.images.map(() => 0));
    setOverallProgress(0);

    try {
      // Upload images in parallel while tracking each progress
      const uploadPromises = item.images.map((file, idx) =>
        uploadFile(file, (progress) => {
          setPerImageProgress((prev) => {
            const next = [...prev];
            next[idx] = progress;
            // update overall as average
            const sum = next.reduce((s, v) => s + v, 0);
            const avg = Math.round(sum / next.length);
            setOverallProgress(avg);
            return next;
          });
        })
      );

      const imageUrls = await Promise.all(uploadPromises);

      const newItem = {
        ...item,
        price:
          typeof item.price === "string"
            ? parseFloat(item.price) || 0
            : item.price,
        images: imageUrls,
        userID,
      };

      await addProduct(newItem);

      // reset
      setItem({
        name: "",
        description: "",
        price: "",
        category: "",
        address: "",
        images: [],
        skinType: "All",
        ingredients: "",
        howToUse: "",
        badges: "",
      });
      setPreview([]);
      setPerImageProgress([]);
      setOverallProgress(0);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error uploading images or saving product:", error);
      alert("Failed to add product. Check console for details.");
    } finally {
      setUploading(false);
    }
  };

  return {
    item,
    preview,
    uploading,
    perImageProgress,
    overallProgress,
    handleChange,
    handleImageChange,
    handleSubmit,
  };
};

export default useProductForm;
