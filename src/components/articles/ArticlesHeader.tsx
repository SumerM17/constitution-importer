
import React from "react";
import { motion } from "framer-motion";

const ArticlesHeader = () => {
  return (
    <section className="py-12 md:py-20 px-4 bg-legal-black text-legal-white">
      <div className="container mx-auto text-center">
        <motion.h1 
          className="text-3xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Laws for Everyday Life
        </motion.h1>
        <motion.p 
          className="max-w-3xl mx-auto text-lg opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Simple explanations of important laws that affect your daily life
        </motion.p>
      </div>
    </section>
  );
};

export default ArticlesHeader;
