
import { ReactNode } from "react";

export interface Contact {
  name: string;
  number: string;
}

export interface Law {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  penalty?: string;
  helpline?: string;
  contactList?: Contact[];
}

export interface LawCategory {
  id: string;
  name: string;
  icon: ReactNode;
}
