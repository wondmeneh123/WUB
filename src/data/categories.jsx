// src/data/categories.jsx

import { MdFace4, MdAutoFixNormal } from "react-icons/md";
import { TbPerfume } from "react-icons/tb";
import { PiHairDryerThin } from "react-icons/pi";

export const categoryData = [
  { name: "Perfume", icon: <TbPerfume size={24} /> },
  { name: "Lotion", icon: <i className="fi fi-ss-react text-2xl"></i> },
  { name: "Facial", icon: <MdFace4 size={24} /> },
  { name: "Treatment", icon: <MdAutoFixNormal size={24} /> },
  { name: "Hair", icon: <PiHairDryerThin size={24} /> },
];
