import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAddProduct } from "../hooks/useAddProduct";
import { useGetUser } from "../hooks/useGetUser";
import { storage } from "../fb";

// Helper function to upload a single file to Firebase Storage
const uploadFile = async (file) => {
  const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Optional: Monitor progress if needed
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Upload error:", error);
        reject(error);
      },
      async () => {
        // Upload successful, get the download URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};

const useProductForm = () => {
  const { addProduct } = useAddProduct();
  const { userID } = useGetUser();

  // --- 1. State Change: 'images' is now an array of files/URLs
  const [item, setItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    address: "",
    images: [], // <-- Changed from 'image' to 'images' (Array of files)
    productStatus: "",
  });

  // 'preview' is now an array of URLs for local preview
  const [preview, setPreview] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --- 2. handleImageChange: Handle Multiple File Input
  const handleImageChange = (e) => {
    if (e.target.files) {
      // Convert FileList to an array and limit to max 5 files
      const files = Array.from(e.target.files).slice(0, 5);

      // Update item state with the selected files
      setItem((prev) => ({
        ...prev,
        images: files,
      }));

      // Create local URLs for preview
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreview(newPreviews);

      // Clean up old object URLs when the component is destroyed or files change
      // Note: Full cleanup needs a separate useEffect in a real app,
      // but for simplicity, we manage the state directly here.
    }
  };

  // --- 3. handleSubmit: Upload Multiple Images
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    // Check if there are any files to upload
    if (item.images.length === 0) {
      alert("Please select at least one image.");
      setUploading(false);
      return;
    }

    try {
      // Upload all files and collect their download URLs
      const imageUrls = [];
      for (const file of item.images) {
        const url = await uploadFile(file); // Use the helper function
        imageUrls.push(url);
      }

      const newItem = {
        ...item,
        price: parseFloat(item.price),
        images: imageUrls, // <-- Save the array of public URLs
        userID,
      };

      await addProduct(newItem);

      // Reset form states
      setItem({
        name: "",
        description: "",
        price: "",
        category: "",
        address: "",
        images: [],
        productStatus: "",
      });
      setPreview([]); // Reset preview array

      // Optional: Success notification here
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding item or uploading images: ", error);
      alert("Failed to add product. Check console for details.");
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
