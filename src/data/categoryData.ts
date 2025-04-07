
import React from "react";
import { Car, BabyIcon, Heart, ShieldAlert, Phone, CircleHelp } from "lucide-react";
import { LawCategory } from "@/types/law-types";

// Updated categories focused on everyday laws
export const lawCategories: LawCategory[] = [
  { id: "traffic", name: "Traffic & Road Safety Laws", icon: <Car className="h-5 w-5" /> },
  { id: "women", name: "Women's Safety & Rights", icon: <Heart className="h-5 w-5" /> },
  { id: "children", name: "Children's Rights & Protection", icon: <BabyIcon className="h-5 w-5" /> },
  { id: "accident", name: "Accident & Compensation", icon: <ShieldAlert className="h-5 w-5" /> },
  { id: "helpline", name: "Important Helplines", icon: <Phone className="h-5 w-5" /> },
  { id: "general", name: "General Knowledge", icon: <CircleHelp className="h-5 w-5" /> },
];
