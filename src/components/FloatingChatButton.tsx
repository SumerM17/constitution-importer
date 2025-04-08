
import React from "react";
import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const FloatingChatButton = () => {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      whileHover={{ scale: 1.1 }}
    >
      <Link to="/chatbot">
        <Button
          className="h-14 w-14 rounded-full bg-legal-accent hover:bg-legal-accent/90 text-white shadow-lg"
          aria-label="Chat with Legal Assistant"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </Link>
    </motion.div>
  );
};

export default FloatingChatButton;
