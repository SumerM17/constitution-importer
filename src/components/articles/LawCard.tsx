
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Car, Heart, BabyIcon, ShieldAlert, Phone, CircleHelp } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Law } from "@/types/law-types";

type LawCardProps = {
  law: Law;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const LawCard = ({ law, isExpanded, onToggleExpand }: LawCardProps) => {
  // Function to render the appropriate icon based on category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "traffic":
        return <Car className="h-5 w-5 text-accent" />;
      case "women":
        return <Heart className="h-5 w-5 text-accent" />;
      case "children":
        return <BabyIcon className="h-5 w-5 text-accent" />;
      case "accident":
        return <ShieldAlert className="h-5 w-5 text-accent" />;
      case "helpline":
        return <Phone className="h-5 w-5 text-accent" />;
      default:
        return <CircleHelp className="h-5 w-5 text-accent" />;
    }
  };

  return (
    <motion.div 
      className="border border-border rounded-md overflow-hidden hover-lift"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className="p-4 bg-muted flex justify-between items-center cursor-pointer"
        onClick={onToggleExpand}
      >
        <div className="flex items-center gap-3">
          {getCategoryIcon(law.category)}
          <div>
            <h3 className="font-medium">{law.title}</h3>
            <p className="text-sm text-muted-foreground">{law.summary}</p>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 legal-text">
          <p className="mb-4">{law.content}</p>
          
          {/* Special rendering for helplines */}
          {law.category === "helpline" && law.contactList && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Emergency Contacts:</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Number</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {law.contactList.map((contact, index) => (
                    <TableRow key={index}>
                      <TableCell>{contact.name}</TableCell>
                      <TableCell className="font-bold">{contact.number}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          {/* Show penalty information if available */}
          {law.penalty && (
            <div className="mt-4 p-3 bg-pink-50 border border-pink-200 rounded-md">
              <p className="text-pink-800"><strong>Penalty:</strong> {law.penalty}</p>
            </div>
          )}
          
          {/* Show helpline information if available */}
          {law.helpline && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-blue-800"><strong>Helpline:</strong> {law.helpline}</p>
            </div>
          )}
          
          <div className="mt-4 pt-4 border-t border-border flex justify-end gap-2">
            <Button variant="outline" size="sm">Share</Button>
            <Button size="sm">Read more</Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default LawCard;
