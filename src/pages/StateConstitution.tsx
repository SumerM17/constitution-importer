
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StateSelector from "@/components/StateSelector";
import StateConstitutionViewer from "@/components/StateConstitutionViewer";
import { motion } from "framer-motion";

const StateConstitution = () => {
  const navigate = useNavigate();
  const { stateCode } = useParams();
  const [selectedState, setSelectedState] = useState(stateCode || "");

  const handleStateChange = (newState: string) => {
    setSelectedState(newState);
    navigate(`/state-constitution/${newState}`);
  };

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
              <h1 className="text-3xl md:text-4xl font-bold font-serif mb-4">State Constitutions of India</h1>
              <p className="text-muted-foreground">
                Explore the constitutional framework of individual states within the Republic of India.
              </p>
            </motion.div>
            
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <StateSelector selectedState={selectedState} onStateChange={handleStateChange} />
              </div>
              
              {selectedState && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <StateConstitutionViewer stateCode={selectedState} />
                </motion.div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default StateConstitution;
