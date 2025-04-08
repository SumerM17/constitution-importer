
import React from "react";
import { Car, Baby, Heart, ShieldAlert, Phone, CircleHelp } from "lucide-react";
import { LawCategory } from "@/types/law-types";

// Updated categories focused on everyday laws
export const lawCategories: LawCategory[] = [
  { 
    id: "traffic", 
    name: "Traffic & Road Safety Laws", 
    icon: React.createElement(Car, { className: "h-5 w-5" })
  },
  { 
    id: "women", 
    name: "Women's Safety & Rights", 
    icon: React.createElement(Heart, { className: "h-5 w-5" })
  },
  { 
    id: "children", 
    name: "Children's Rights & Protection", 
    icon: React.createElement(Baby, { className: "h-5 w-5" })
  },
  { 
    id: "accident", 
    name: "Accident & Compensation", 
    icon: React.createElement(ShieldAlert, { className: "h-5 w-5" })
  },
  { 
    id: "helpline", 
    name: "Important Helplines", 
    icon: React.createElement(Phone, { className: "h-5 w-5" })
  },
  { 
    id: "general", 
    name: "General Knowledge", 
    icon: React.createElement(CircleHelp, { className: "h-5 w-5" })
  },
];
