import React from "react";

const Profile = () => {
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
  ];
  return (
    <div className="bg-white">
      <div className="fixed top-0 left-0 right-0 flex justify-center items-center bg-white ">
        <h2 className="font-bold text-xl my-3 text-center">Profile</h2>
      </div>
      <div className="flex mt-10 flex-col justify-center items-center">
        <img
          width={150}
          height={200}
          src="https://img.freepik.com/premium-vector/portrait-avatar-male-laughter-joy-smile-calmness-diversity-personage_147933-10265.jpg?ga=GA1.1.1931341189.1721541823&semt=ais_hybrid"
        />
        <h2 className="font-bold text-3xl">Solomon Barega</h2>
        <h3 className="text-2xl">Electronics vendor</h3>
      </div>
      <div className="flex justify-around  px-3 py-4 bg-[#d43790] text-white m-5 rounded-2xl">
        <h3 className="font-bold text-xl">20 Ads posted</h3>
        <h3 className="font-bold text-xl">4.8 Rating</h3>
      </div>
      <div className="mx-5">
        <h3 className="my-3">Solomon Barega's Ads </h3>
        <div className="px-4 text-xl font-semibold flex flex-col">
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
      </div>
    </div>
  );
};

export default Profile;
