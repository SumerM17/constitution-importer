
import React, { useState } from "react";
import { BookOpen, Bookmark, Star, Brain, Award, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const StudentMode: React.FC = () => {
  const [step, setStep] = useState(0);
  
  const lessons = [
    {
      title: "What is a Constitution?",
      icon: <BookOpen className="h-12 w-12 text-blue-500" />,
      content: "A constitution is like a rulebook for a country. It tells everyone how the country should work and what rules everyone should follow.",
      animation: "float"
    },
    {
      title: "The Story of India's Constitution",
      icon: <Bookmark className="h-12 w-12 text-green-500" />,
      content: "India's constitution was written after we became free from British rule. It took almost 3 years to write it!",
      animation: "bounce-in"
    },
    {
      title: "Fundamental Rights",
      icon: <Star className="h-12 w-12 text-yellow-500" />,
      content: "These are special rights that every Indian citizen has, like the right to speak freely and the right to go to school.",
      animation: "scale-in"
    },
    {
      title: "How Laws Are Made",
      icon: <Brain className="h-12 w-12 text-purple-500" />,
      content: "People we vote for make laws in big buildings called Parliament. They talk about ideas and then vote on them.",
      animation: "fade-up"
    },
    {
      title: "Our National Symbols",
      icon: <Flag className="h-12 w-12 text-india-saffron" />,
      content: "India has special symbols like our flag with saffron, white, and green colors, and our national animal, the tiger!",
      animation: "slide-in"
    }
  ];
  
  const currentLesson = lessons[step];
  
  const nextLesson = () => {
    if (step < lessons.length - 1) {
      setStep(step + 1);
    } else {
      setStep(0);
    }
  };
  
  const prevLesson = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      setStep(lessons.length - 1);
    }
  };

  return (
    <div className="student-mode max-w-4xl mx-auto my-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Constitution for Kids
      </h2>
      
      <motion.div 
        className="bg-white rounded-lg shadow-xl p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <motion.div 
            className={`bg-blue-100 rounded-full p-4 animate-${currentLesson.animation}`}
            key={step}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {currentLesson.icon}
          </motion.div>
          
          <div>
            <motion.h3 
              className="text-xl md:text-2xl font-bold mb-2"
              key={`title-${step}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {currentLesson.title}
            </motion.h3>
            
            <motion.p 
              className="text-gray-700 text-lg"
              key={`content-${step}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              {currentLesson.content}
            </motion.p>
          </div>
        </div>
        
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={prevLesson}
            className="hover-lift"
          >
            Previous Lesson
          </Button>
          
          <div className="flex gap-1">
            {lessons.map((_, i) => (
              <motion.button
                key={i}
                className={`h-2 w-2 rounded-full ${i === step ? 'bg-blue-500' : 'bg-gray-300'}`}
                onClick={() => setStep(i)}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
          
          <Button 
            onClick={nextLesson}
            className="hover-lift bg-blue-500 hover:bg-blue-600 text-white"
          >
            Next Lesson
          </Button>
        </div>
      </motion.div>
      
      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button 
          variant="outline" 
          className="hover-lift bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none"
          onClick={() => window.open("https://ncert.nic.in/textbook.php", "_blank")}
        >
          <Award className="mr-2 h-5 w-5" />
          Explore More Learning Resources
        </Button>
      </motion.div>
    </div>
  );
};

export default StudentMode;
