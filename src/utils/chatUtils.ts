
import { Law } from "@/types/law-types";
import { practicalLawsData } from "@/data/lawsData";

export const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const findRelevantLaws = (query: string): Law[] => {
  const keywords = query.toLowerCase().split(' ');
  
  const scoreMap: Map<Law, number> = new Map();
  
  // Score each law based on keyword matches
  practicalLawsData.forEach(law => {
    let score = 0;
    const lawText = `${law.title} ${law.category} ${law.summary} ${law.content}`.toLowerCase();
    
    keywords.forEach(keyword => {
      if (keyword.length <= 2) return; // Skip very short words
      if (lawText.includes(keyword)) {
        score += 1;
        // Bonus points for title matches
        if (law.title.toLowerCase().includes(keyword)) {
          score += 2;
        }
      }
    });
    
    if (score > 0) {
      scoreMap.set(law, score);
    }
  });
  
  // Sort laws by score and return top 3 results
  const sortedLaws = Array.from(scoreMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0])
    .slice(0, 3);
    
  return sortedLaws;
};

export const generateBotResponse = (query: string): { message: string; laws: Law[] } => {
  const relevantLaws = findRelevantLaws(query);
  
  if (relevantLaws.length === 0) {
    return {
      message: "I couldn't find specific laws related to your query. Could you please provide more details or try a different question?",
      laws: []
    };
  }
  
  const botMessage = `Based on your query, here are some relevant laws that might help:`;
  
  return {
    message: botMessage,
    laws: relevantLaws
  };
};
