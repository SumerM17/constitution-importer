
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,153,51,0.1),transparent_70%)]"></div>
        <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJWNmgydjEwem0tNiA2aC00di0yaDR2MnptMCA2aC00di0yaDR2MnptMCA0aC00di0yaDR2MnptMCA2aC00di0yaDR2MnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
      </div>
      
      <div className="container mx-auto z-10 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2 flex flex-col items-start space-y-8 animate-fade-up">
            <div className="inline-flex items-center rounded-full border border-india-saffron/30 bg-india-saffron/10 px-3 py-1 text-sm font-medium text-india-saffron">
              <span>Digital Preservation Project</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight tracking-tight text-balance">
              The Constitution of India
              <span className="block text-xl md:text-2xl mt-3 text-foreground/80 font-normal">
                भारत का संविधान
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              Explore the world's longest written constitution, a living document that embodies the vision, hopes, and aspirations of over a billion people.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2 group">
                Start Reading
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
            
            <div className="pt-4 border-t border-border w-full">
              <p className="text-sm text-muted-foreground">
                Adopted on 26 November 1949 • Effective from 26 January 1950
              </p>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative overflow-hidden rounded-xl border animate-fade-in">
            <div className="aspect-[4/5] relative overflow-hidden bg-muted">
              <motion.img
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1000&auto=format&fit=crop"
                alt="Indian Constitution original document"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 border">
                  <p className="text-sm font-medium">
                    The original Constitution of India is preserved in a helium-filled case at the Parliament Library, New Delhi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
