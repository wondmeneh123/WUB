import React, { useState } from "react";
import { MdDiscount } from "react-icons/md";
import { MdFace4 } from "react-icons/md";
import { TbPerfume } from "react-icons/tb";
import { MdAutoFixNormal } from "react-icons/md";
import { PiHairDryerThin } from "react-icons/pi";
import { BiSearch } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import { BsThreeDots } from "react-icons/bs";
import Header from "../componenets/Header";

const Shop = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const navigate = useNavigate();

  const categories = [
    { name: "Perfume", icon: <TbPerfume /> },
    { name: "Lotion", icon: <i class="fi fi-ss-react"></i> },
    { name: "Facial", icon: <MdFace4 /> },
    { name: "Treatment", icon: <MdAutoFixNormal /> },
    { name: "Hair", icon: <PiHairDryerThin /> },
    { name: "Others", icon: <BsThreeDots /> },
  ];

  const items = [
    {
      name: "Radiant Glow Foundation",
      description:
        "A lightweight, long-lasting foundation that gives your skin a natural, radiant glow. Perfect for all-day wear.",
      category: "Foundation",
      tags: ["beauty", "cosmetics", "makeup", "foundation", "glow"],
      price: 39.99,
      thumbnail:
        "https://img.freepik.com/free-photo/front-view-yellow-fragrance-bottle-with-golden-cap-white-wall_140725-11697.jpg?size=626&ext=jpg&ga=GA1.2.1931341189.1721541823&semt=ais_hybrid",
      pictures: [
        {
          link: "https://img.freepik.com/free-psd/luxury-perfume-bottle-png-isolated-transparent-background_191095-9839.jpg?size=626&ext=jpg&ga=GA1.2.1931341189.1721541823&semt=ais_hybrid",
        },
        {
          link: "https://www.freepik.com/free-photo/front-view-yellow-fragrance-bottle-with-golden-cap-white-wall_8353627.htm#query=perfume%20png&position=16&from_view=keyword&track=ais_hybrid&uuid=9c28eb72-ee1e-477a-a63c-7b48a6e3c80f",
        },
        {
          link: "https://img.freepik.com/free-photo/front-view-fragrance-brown-designed-with-black-cap-white-desk_140725-11623.jpg?size=626&ext=jpg&ga=GA1.2.1931341189.1721541823&semt=ais_hybrid",
        },
      ],
      vendor: {
        name: "Beauty Essentials",
        phoneNumber: "987-654-3210",
        rating: 4.8,
      },
      availability: "In Stock",
      discount: 15,
      reviews: [
        {
          user: "Alice Johnson",
          rating: 4,
          comment: "Great coverage and feels light on the skin.",
        },
        {
          user: "Emma Williams",
          rating: 5,
          comment: "Best foundation I've ever used! Gives a natural look.",
        },
      ],
      brand: "Beauty Essentials",
      color: "Medium Beige",
      expirationDate: "2025-12-31",
      skinType: "All Skin Types",
      applicationMethod: "Apply evenly to the face with a brush or sponge.",
    },
    {
      name: "Samsung lotion",
      description:
        "A lightweight, long-lasting foundation that gives your skin a natural, radiant glow. Perfect for all-day wear.",
      category: "Foundation",
      tags: ["beauty", "cosmetics", "makeup", "foundation", "glow"],
      price: 39.99,
      thumbnail:
        "https://img.freepik.com/free-photo/top-view-hand-soap-surrounded-by-leaves_23-2148619975.jpg?ga=GA1.1.1931341189.1721541823&semt=ais_hybrid",
      pictures: [
        {
          link: "https://img.freepik.com/free-psd/luxury-perfume-bottle-png-isolated-transparent-background_191095-9839.jpg?size=626&ext=jpg&ga=GA1.2.1931341189.1721541823&semt=ais_hybrid",
        },
        {
          link: "https://www.freepik.com/free-photo/front-view-yellow-fragrance-bottle-with-golden-cap-white-wall_8353627.htm#query=perfume%20png&position=16&from_view=keyword&track=ais_hybrid&uuid=9c28eb72-ee1e-477a-a63c-7b48a6e3c80f",
        },
        {
          link: "https://img.freepik.com/free-photo/front-view-fragrance-brown-designed-with-black-cap-white-desk_140725-11623.jpg?size=626&ext=jpg&ga=GA1.2.1931341189.1721541823&semt=ais_hybrid",
        },
      ],
      vendor: {
        name: "Beauty Essentials",
        phoneNumber: "987-654-3210",
        rating: 4.8,
      },
      availability: "In Stock",
      discount: 15,
      reviews: [
        {
          user: "Alice Johnson",
          rating: 4,
          comment: "Great coverage and feels light on the skin.",
        },
        {
          user: "Emma Williams",
          rating: 5,
          comment: "Best foundation I've ever used! Gives a natural look.",
        },
      ],
      brand: "Beauty Essentials",
      color: "Medium Beige",
      expirationDate: "2025-12-31",
      skinType: "All Skin Types",
      applicationMethod: "Apply evenly to the face with a brush or sponge.",
    },
    {
      name: "Galaxy human hair",
      description:
        "A lightweight, long-lasting foundation that gives your skin a natural, radiant glow. Perfect for all-day wear.",
      category: "Foundation",
      tags: ["beauty", "cosmetics", "makeup", "foundation", "glow"],
      price: 240.99,
      thumbnail:
        "https://img.freepik.com/premium-photo/wig-long-wavy-blonde-hair-styled-symmetrical-fashion-isolated-transparent-background-png_911620-30129.jpg?ga=GA1.1.1931341189.1721541823&semt=ais_hybrid",
      pictures: [
        {
          link: "https://img.freepik.com/free-psd/luxury-perfume-bottle-png-isolated-transparent-background_191095-9839.jpg?size=626&ext=jpg&ga=GA1.2.1931341189.1721541823&semt=ais_hybrid",
        },
        {
          link: "https://www.freepik.com/free-photo/front-view-yellow-fragrance-bottle-with-golden-cap-white-wall_8353627.htm#query=perfume%20png&position=16&from_view=keyword&track=ais_hybrid&uuid=9c28eb72-ee1e-477a-a63c-7b48a6e3c80f",
        },
        {
          link: "https://img.freepik.com/free-photo/front-view-fragrance-brown-designed-with-black-cap-white-desk_140725-11623.jpg?size=626&ext=jpg&ga=GA1.2.1931341189.1721541823&semt=ais_hybrid",
        },
      ],
      vendor: {
        name: "Beauty Essentials",
        phoneNumber: "987-654-3210",
        rating: 4.8,
      },
      availability: "In Stock",
      discount: 15,
      reviews: [
        {
          user: "Alice Johnson",
          rating: 4,
          comment: "Great coverage and feels light on the skin.",
        },
        {
          user: "Emma Williams",
          rating: 5,
          comment: "Best foundation I've ever used! Gives a natural look.",
        },
      ],
      brand: "Beauty Essentials",
      color: "Medium Beige",
      expirationDate: "2025-12-31",
      skinType: "All Skin Types",
      applicationMethod: "Apply evenly to the face with a brush or sponge.",
    },
    {
      name: "Sun screen",
      description:
        "A lightweight, long-lasting foundation that gives your skin a natural, radiant glow. Perfect for all-day wear.",
      category: "Foundation",
      tags: ["beauty", "cosmetics", "makeup", "foundation", "glow"],
      price: 39.99,
      thumbnail:
        "https://img.freepik.com/free-vector/sunscreen-product-with-pink-flowers_74855-448.jpg?size=626&ext=jpg&ga=GA1.1.1931341189.1721541823&semt=ais_hybrid",
      pictures: [
        {
          link: "https://img.freepik.com/free-psd/luxury-perfume-bottle-png-isolated-transparent-background_191095-9839.jpg?size=626&ext=jpg&ga=GA1.2.1931341189.1721541823&semt=ais_hybrid",
        },
        {
          link: "https://www.freepik.com/free-photo/front-view-yellow-fragrance-bottle-with-golden-cap-white-wall_8353627.htm#query=perfume%20png&position=16&from_view=keyword&track=ais_hybrid&uuid=9c28eb72-ee1e-477a-a63c-7b48a6e3c80f",
        },
        {
          link: "https://img.freepik.com/free-photo/front-view-fragrance-brown-designed-with-black-cap-white-desk_140725-11623.jpg?size=626&ext=jpg&ga=GA1.2.1931341189.1721541823&semt=ais_hybrid",
        },
      ],
      vendor: {
        name: "Beauty Essentials",
        phoneNumber: "987-654-3210",
        rating: 4.8,
      },
      availability: "In Stock",
      discount: 15,
      reviews: [
        {
          user: "Alice Johnson",
          rating: 4,
          comment: "Great coverage and feels light on the skin.",
        },
        {
          user: "Emma Williams",
          rating: 5,
          comment: "Best foundation I've ever used! Gives a natural look.",
        },
      ],
      brand: "Beauty Essentials",
      color: "Medium Beige",
      expirationDate: "2025-12-31",
      skinType: "All Skin Types",
      applicationMethod: "Apply evenly to the face with a brush or sponge.",
    },
    {
      name: "Lip stick",
      description:
        "A lightweight, long-lasting foundation that gives your skin a natural, radiant glow. Perfect for all-day wear.",
      category: "Foundation",
      tags: ["beauty", "cosmetics", "makeup", "foundation", "glow"],
      price: 200.99,
      thumbnail:
        "https://img.freepik.com/free-photo/closeup-pink-lipstick-women_53876-65244.jpg?ga=GA1.1.1931341189.1721541823&semt=ais_hybrid",
      pictures: [
        {
          link: "https://img.freepik.com/free-psd/luxury-perfume-bottle-png-isolated-transparent-background_191095-9839.jpg?size=626&ext=jpg&ga=GA1.2.1931341189.1721541823&semt=ais_hybrid",
        },
        {
          link: "https://www.freepik.com/free-photo/front-view-yellow-fragrance-bottle-with-golden-cap-white-wall_8353627.htm#query=perfume%20png&position=16&from_view=keyword&track=ais_hybrid&uuid=9c28eb72-ee1e-477a-a63c-7b48a6e3c80f",
        },
        {
          link: "https://img.freepik.com/free-photo/front-view-fragrance-brown-designed-with-black-cap-white-desk_140725-11623.jpg?size=626&ext=jpg&ga=GA1.2.1931341189.1721541823&semt=ais_hybrid",
        },
      ],
      vendor: {
        name: "Beauty Essentials",
        phoneNumber: "987-654-3210",
        rating: 4.8,
      },
      availability: "In Stock",
      discount: 15,
      reviews: [
        {
          user: "Alice Johnson",
          rating: 4,
          comment: "Great coverage and feels light on the skin.",
        },
        {
          user: "Emma Williams",
          rating: 5,
          comment: "Best foundation I've ever used! Gives a natural look.",
        },
      ],
      brand: "Beauty Essentials",
      color: "Medium Beige",
      expirationDate: "2025-12-31",
      skinType: "All Skin Types",
      applicationMethod: "Apply evenly to the face with a brush or sponge.",
    },
    {
      name: "Masacara",
      description:
        "A lightweight, long-lasting foundation that gives your skin a natural, radiant glow. Perfect for all-day wear.",
      category: "Foundation",
      tags: ["beauty", "cosmetics", "makeup", "foundation", "glow"],
      price: 250,
      thumbnail:
        "https://img.freepik.com/free-photo/beautiful-girl-with-colorful-makeup_144627-8211.jpg?ga=GA1.1.1931341189.1721541823&semt=sph",
      pictures: [
        {
          link: "https://img.freepik.com/free-psd/luxury-perfume-bottle-png-isolated-transparent-background_191095-9839.jpg?size=626&ext=jpg&ga=GA1.2.1931341189.1721541823&semt=ais_hybrid",
        },
        {
          link: "https://www.freepik.com/free-photo/front-view-yellow-fragrance-bottle-with-golden-cap-white-wall_8353627.htm#query=perfume%20png&position=16&from_view=keyword&track=ais_hybrid&uuid=9c28eb72-ee1e-477a-a63c-7b48a6e3c80f",
        },
        {
          link: "https://img.freepik.com/free-photo/front-view-fragrance-brown-designed-with-black-cap-white-desk_140725-11623.jpg?size=626&ext=jpg&ga=GA1.2.1931341189.1721541823&semt=ais_hybrid",
        },
      ],
      vendor: {
        name: "Beauty Essentials",
        phoneNumber: "987-654-3210",
        rating: 4.8,
      },
      availability: "In Stock",
      discount: 15,
      reviews: [
        {
          user: "Alice Johnson",
          rating: 4,
          comment: "Great coverage and feels light on the skin.",
        },
        {
          user: "Emma Williams",
          rating: 5,
          comment: "Best foundation I've ever used! Gives a natural look.",
        },
      ],
      brand: "Beauty Essentials",
      color: "Medium Beige",
      expirationDate: "2025-12-31",
      skinType: "All Skin Types",
      applicationMethod: "Apply evenly to the face with a brush or sponge.",
    },
    {
      name: "Makeup toolkit",
      description:
        "A lightweight, long-lasting foundation that gives your skin a natural, radiant glow. Perfect for all-day wear.",
      category: "Foundation",
      tags: ["beauty", "cosmetics", "makeup", "foundation", "glow"],
      price: 1500,
      thumbnail:
        "https://img.freepik.com/premium-photo/pink-bag-brushes-with-pink-leather-strap_1110958-13747.jpg?ga=GA1.1.1931341189.1721541823&semt=ais_hybrid",
      pictures: [
        {
          link: "https://img.freepik.com/free-psd/luxury-perfume-bottle-png-isolated-transparent-background_191095-9839.jpg?size=626&ext=jpg&ga=GA1.2.1931341189.1721541823&semt=ais_hybrid",
        },
        {
          link: "https://www.freepik.com/free-photo/front-view-yellow-fragrance-bottle-with-golden-cap-white-wall_8353627.htm#query=perfume%20png&position=16&from_view=keyword&track=ais_hybrid&uuid=9c28eb72-ee1e-477a-a63c-7b48a6e3c80f",
        },
        {
          link: "https://img.freepik.com/free-photo/front-view-fragrance-brown-designed-with-black-cap-white-desk_140725-11623.jpg?size=626&ext=jpg&ga=GA1.2.1931341189.1721541823&semt=ais_hybrid",
        },
      ],
      vendor: {
        name: "Beauty Essentials",
        phoneNumber: "987-654-3210",
        rating: 4.8,
      },
      availability: "In Stock",
      discount: 15,
      reviews: [
        {
          user: "Alice Johnson",
          rating: 4,
          comment: "Great coverage and feels light on the skin.",
        },
        {
          user: "Emma Williams",
          rating: 5,
          comment: "Best foundation I've ever used! Gives a natural look.",
        },
      ],
      brand: "Beauty Essentials",
      color: "Medium Beige",
      expirationDate: "2025-12-31",
      skinType: "All Skin Types",
      applicationMethod: "Apply evenly to the face with a brush or sponge.",
    },
    {
      name: "Hair oil",
      description:
        "A lightweight, long-lasting foundation that gives your skin a natural, radiant glow. Perfect for all-day wear.",
      category: "Foundation",
      tags: ["beauty", "cosmetics", "makeup", "foundation", "glow"],
      price: 39.99,
      thumbnail:
        "https://img.freepik.com/free-photo/close-up-elegant-beauty-selfcare-treatment_23-2149238334.jpg?ga=GA1.1.1931341189.1721541823&semt=ais_hybrid",
      pictures: [
        {
          link: "https://img.freepik.com/free-psd/luxury-perfume-bottle-png-isolated-transparent-background_191095-9839.jpg?size=626&ext=jpg&ga=GA1.2.1931341189.1721541823&semt=ais_hybrid",
        },
        {
          link: "https://www.freepik.com/free-photo/front-view-yellow-fragrance-bottle-with-golden-cap-white-wall_8353627.htm#query=perfume%20png&position=16&from_view=keyword&track=ais_hybrid&uuid=9c28eb72-ee1e-477a-a63c-7b48a6e3c80f",
        },
        {
          link: "https://img.freepik.com/free-photo/front-view-fragrance-brown-designed-with-black-cap-white-desk_140725-11623.jpg?size=626&ext=jpg&ga=GA1.2.1931341189.1721541823&semt=ais_hybrid",
        },
      ],
      vendor: {
        name: "Beauty Essentials",
        phoneNumber: "987-654-3210",
        rating: 4.8,
      },
      availability: "In Stock",
      discount: 15,
      reviews: [
        {
          user: "Alice Johnson",
          rating: 4,
          comment: "Great coverage and feels light on the skin.",
        },
        {
          user: "Emma Williams",
          rating: 5,
          comment: "Best foundation I've ever used! Gives a natural look.",
        },
      ],
      brand: "Beauty Essentials",
      color: "Medium Beige",
      expirationDate: "2025-12-31",
      skinType: "All Skin Types",
      applicationMethod: "Apply evenly to the face with a brush or sponge.",
    },
  ];

  const showItemDetail = (item) => {
    navigate(`/item/${item.id}`, { state: { item } });
  };

  const closeItemDetail = () => {
    setSelectedItem(null);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="mt-1 overflow-y-auto flex-1">
        <div className="flex items-center justify-between gap-3 px-5">
          <div className="flex bg-white items-center w-full p-2 rounded-2xl">
            <BiSearch size={20} />
            <input
              type="text"
              className="ml-2 w-full"
              placeholder="Search..."
            />
          </div>
          <div className="p-3  rounded-full active:border-0 active:border-white">
            <FiFilter size={20} />
          </div>
        </div>
        <div className="flex p-4 m-4 bg-[#d43790] justify-around rounded-2xl text-white items-center">
          <div className="flex flex-col">
            <p>Men's Fashion Collection</p>
            <p>Discount up to 60%</p>
          </div>
          <MdDiscount size={50} color="#fff" />
        </div>
        <div className="flex overflow-x-scroll gap-2 px-4 text-sm my-2 justify-center">
          {categories.map((cate) => (
            <div
              key={cate.name}
              className="bg-white px-2 py-1 rounded-xl flex flex-col justify-center items-center cursor-pointer"
            >
              {cate.icon}
              {cate.name}
            </div>
          ))}
        </div>

        <div className="px-4 text-xl font-semibold flex flex-col overflow-y-scroll">
          <p className="my-5">Popular</p>
          <div className="columns-2 gap-4">
            {items.map((item) => (
              <div key={item.id} className="mb-4 break-inside-avoid">
                <img
                  src={item.thumbnail}
                  className="w-full rounded-2xl cursor-pointer"
                  alt={item.name}
                  onClick={() => showItemDetail(item)}
                />
                <p className="text-[16px] mt-1">
                  {item.price} <b>Br</b>
                </p>
              </div>
            ))}
          </div>
        </div>

        {selectedItem && (
          <ItemDetail item={selectedItem} onClose={closeItemDetail} />
        )}
      </div>
    </div>
  );
};

export default Shop;
