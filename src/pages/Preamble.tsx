
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ScrollText, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

const Preamble = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero */}
        <section className="py-12 md:py-20 px-4 bg-legal-black text-legal-white">
          <div className="container mx-auto text-center">
            <motion.h1 
              className="text-3xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Preamble to the Constitution of India
            </motion.h1>
            <motion.p 
              className="max-w-3xl mx-auto text-lg opacity-90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              The philosophical introduction to the Constitution that sets out its purpose and guiding principles
            </motion.p>
          </div>
        </section>
        
        {/* Preamble content */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div 
              className="legal-paper p-8 md:p-12 rounded-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="text-center mb-8">
                <ScrollText className="mx-auto h-12 w-12 mb-4 text-legal-accent" />
                <h2 className="legal-heading text-2xl md:text-3xl">The Preamble</h2>
              </div>
              
              <div className="legal-text text-lg space-y-6 text-center">
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="font-bold"
                >
                  WE, THE PEOPLE OF INDIA,
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  having solemnly resolved to constitute India into a
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="font-bold text-xl md:text-2xl space-y-2"
                >
                  <p>SOVEREIGN</p>
                  <p>SOCIALIST</p>
                  <p>SECULAR</p>
                  <p>DEMOCRATIC</p>
                  <p>REPUBLIC</p>
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  and to secure to all its citizens:
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="space-y-2"
                >
                  <p>JUSTICE, social, economic and political;</p>
                  <p>LIBERTY of thought, expression, belief, faith and worship;</p>
                  <p>EQUALITY of status and of opportunity;</p>
                  <p>and to promote among them all</p>
                  <p>FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation;</p>
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.
                </motion.p>
              </div>
            </motion.div>
            
            <motion.div 
              className="mt-12 space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <div className="bg-card p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Historical Context</h3>
                <p className="text-muted-foreground">
                  The Preamble to the Constitution of India was adopted on 26 November 1949 by the Constituent Assembly and came into effect on 26 January 1950, celebrated as the Republic Day in India. The preamble was amended once by the 42nd Amendment Act of 1976, during the Emergency, when the words "socialist", "secular", and "integrity" were added.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Legal Significance</h3>
                <p className="text-muted-foreground">
                  The Supreme Court of India has, in the Kesavananda Bharati case, recognized that the Preamble may be used to interpret ambiguous areas of the Constitution and to uphold its basic structure doctrine. However, the Preamble is not enforceable in a court of law.
                </p>
              </div>
              
              <div className="flex justify-center gap-4 mt-8">
                <Button className="hover-lift">
                  <Bookmark className="mr-2 h-4 w-4" />
                  Save for Later
                </Button>
                <Button variant="outline" className="hover-lift">
                  Share
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Preamble;
