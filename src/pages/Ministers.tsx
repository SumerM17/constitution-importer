
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CentralMinistersTable from "@/components/CentralMinistersTable";
import StateMinistersTable from "@/components/StateMinistersTable";

const Ministers = () => {
  const [activeTab, setActiveTab] = useState("central");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <h1 className="text-3xl md:text-4xl font-bold font-serif mb-4">Ministers Directory</h1>
              <p className="text-muted-foreground">
                Comprehensive information about Union and State Ministers of India, organized by department.
              </p>
            </motion.div>
            
            <div className="max-w-6xl mx-auto">
              <Tabs defaultValue="central" onValueChange={setActiveTab} value={activeTab}>
                <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
                  <TabsTrigger value="central">Central Ministers</TabsTrigger>
                  <TabsTrigger value="state">State Ministers</TabsTrigger>
                </TabsList>
                
                <TabsContent value="central">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CentralMinistersTable />
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="state">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <StateMinistersTable />
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Ministers;
