// src/data/categories.jsx

import { MdFace4, MdAutoFixNormal, MdOutlineCleanHands } from "react-icons/md";
import { TbPerfume, TbMoodSpark } from "react-icons/tb";
import { PiHairDryerThin, PiPaintBrushBroadFill } from "react-icons/pi";
import { GiLipstick, GiSoap } from "react-icons/gi";
import { RiSunLine } from "react-icons/ri";

export const categoryData = [
  { name: "Perfume", icon: <TbPerfume size={24} /> },
  { name: "Facial", icon: <MdFace4 size={24} /> },
  { name: "Makeup", icon: <GiLipstick size={24} /> },
  { name: "Hair", icon: <PiHairDryerThin size={24} /> },
  { name: "Body Care", icon: <GiSoap size={24} /> },
  { name: "Treatment", icon: <MdAutoFixNormal size={24} /> },
  { name: "Sun Care", icon: <RiSunLine size={24} /> },
  { name: "Nails", icon: <MdOutlineCleanHands size={24} /> },
  { name: "Tools", icon: <PiPaintBrushBroadFill size={24} /> },
  { name: "Organic", icon: <TbMoodSpark size={24} /> },
];
