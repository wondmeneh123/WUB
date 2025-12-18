import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAddProduct } from "../hooks/useAddProduct";
import { useGetUser } from "../hooks/useGetUser";
import { storage } from "../fb";

// Helper function to upload a single file to Firebase Storage
const uploadFile = async (file) => {
  // Creating a unique reference for each image using a timestamp
  const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Track upload progress
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Upload error:", error);
        reject(error);
      },
      async () => {
        // On successful upload, get the public download URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};

const useProductForm = () => {
  const { addProduct } = useAddProduct();
  const { userID } = useGetUser();

  // Initialize state with basic info + cosmetic specific features
  const [item, setItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    address: "",
    images: [], // Array to store file objects
    skinType: "All", // Added: Cosmetic skin type
    ingredients: "", // Added: Cosmetic ingredients
    howToUse: "", // Added: Cosmetic usage instructions
  });

  const [preview, setPreview] = useState([]); // Array for local image previews
  const [uploading, setUploading] = useState(false);

  // Handle standard input changes (text, select, textarea)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image selection (multiple files)
  const handleImageChange = (e) => {
    if (e.target.files) {
      // Convert FileList to Array and limit to 5 images
      const files = Array.from(e.target.files).slice(0, 5);

      setItem((prev) => ({
        ...prev,
        images: files,
      }));

      // Generate local blob URLs for instant UI preview
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreview(newPreviews);
    }
  };

  // Final submission logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    if (item.images.length === 0) {
      alert("Please select at least one image.");
      setUploading(false);
      return;
    }

    try {
      // 1. Upload all selected images in parallel or sequence
      const imageUrls = [];
      for (const file of item.images) {
        const url = await uploadFile(file);
        imageUrls.push(url);
      }

      // 2. Build the final object to be saved in Firestore
      const newItem = {
        ...item,
        price: parseFloat(item.price),
        images: imageUrls, // Replace file objects with download URLs
        userID,
      };

      // 3. Save to Firestore using the addProduct hook
      await addProduct(newItem);

      // 4. Reset form state to initial values
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
      });
      setPreview([]);

      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding item or uploading images: ", error);
      alert("Failed to add product.");
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
