
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, School, Users, Mail, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
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
              About This Project
            </motion.h1>
            <motion.p 
              className="max-w-3xl mx-auto text-lg opacity-90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Making the Constitution of India accessible and engaging for everyone
            </motion.p>
          </div>
        </section>
        
        {/* Mission */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div 
              className="bg-card p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-40 h-40 rounded-full bg-legal-accent flex items-center justify-center">
                    <BookOpen className="h-20 w-20 text-white" />
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground mb-4">
                    The Constitution of India is the supreme law of India. It lays down the framework that demarcates fundamental political code, structure, procedures, powers, and duties of government institutions and sets out fundamental rights, directive principles, and the duties of citizens.
                  </p>
                  <p className="text-muted-foreground">
                    Our mission is to make this foundational document accessible, understandable, and engaging for all citizens of India - from legal scholars to students, from policymakers to the general public.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Features */}
        <section className="py-16 px-4 bg-secondary">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">What We Offer</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <BookOpen className="h-10 w-10 text-legal-accent" />,
                  title: "Complete Constitutional Text",
                  description: "Access the full text of the Constitution of India, including all amendments and updates."
                },
                {
                  icon: <School className="h-10 w-10 text-legal-accent" />,
                  title: "Educational Resources",
                  description: "Specially designed content for students, including simplified explanations and interactive learning tools."
                },
                {
                  icon: <Users className="h-10 w-10 text-legal-accent" />,
                  title: "For Everyone",
                  description: "Content designed for various audiences, from legal professionals to young learners just beginning to explore civics."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-card p-6 rounded-lg shadow-md hover-lift"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="rounded-full bg-legal-accent/10 p-4 w-16 h-16 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">The Team</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Our team is composed of legal experts, educators, designers, and developers passionate about constitutional education.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Sumit Magdum",
                  role: "Constitutional Expert",
                  image: "https://randomuser.me/api/portraits/men/32.jpg"
                },
                {
                  name: "Pratik Khamkar",
                  role: "Data Collection",
                  image: "https://randomuser.me/api/portraits/men/23.jpg"
                },
                {
                  name: "Nandini Vernekar",
                  role: "Lead Developer",
                  image: "https://randomuser.me/api/portraits/women/20.jpg"
                },
                {
                  name: "Mrunmayee Torve",
                  role: "UX Designer",
                  image: "https://randomuser.me/api/portraits/women/21.jpg"
                },
                {
                  name: "Sumer Maner",
                  role: "Development",
                  image: "https://randomuser.me/api/portraits/men/44.jpg"
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  className="bg-card rounded-lg p-4 text-center hover-lift"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-legal-accent"
                  />
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-muted-foreground text-sm">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact */}
        <section className="py-16 px-4 bg-legal-black text-legal-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Get In Touch</h2>
            <p className="mb-8 opacity-90 max-w-2xl mx-auto">
              Have questions, suggestions, or want to contribute to this project? We'd love to hear from you!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-white text-legal-black hover:bg-white/90">
                <Mail className="mr-2 h-4 w-4" />
                Contact Us
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-white/10">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-white/10">
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
