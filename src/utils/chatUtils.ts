
import { Law } from "@/types/law-types";
import { practicalLawsData } from "@/data/lawsData";

export const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const findRelevantLaws = (query: string): Law[] => {
  const keywords = query.toLowerCase().split(' ');
  
  const scoreMap: Map<Law, number> = new Map();
  
  // Score each law based on keyword matches with improved algorithm
  practicalLawsData.forEach(law => {
    let score = 0;
    const lawText = `${law.title} ${law.category} ${law.summary} ${law.content}`.toLowerCase();
    
    // Check for exact phrase matches first (higher priority)
    if (lawText.includes(query.toLowerCase())) {
      score += 10; // Significant bonus for exact phrase match
    }

    // Then check for individual keywords
    keywords.forEach(keyword => {
      if (keyword.length <= 2) return; // Skip very short words
      
      // Weight matches by keyword importance
      const keywordWeight = getKeywordWeight(keyword);
      
      if (lawText.includes(keyword)) {
        score += keywordWeight;
        
        // Boost title matches
        if (law.title.toLowerCase().includes(keyword)) {
          score += 3;
        }
        
        // Boost category matches
        if (law.category.toLowerCase() === keyword || 
            law.category.toLowerCase().includes(keyword)) {
          score += 2;
        }
        
        // Boost content specifics
        if (law.content.toLowerCase().includes(keyword)) {
          // Count multiple occurrences of a keyword
          const occurrences = (law.content.toLowerCase().match(new RegExp(keyword, 'g')) || []).length;
          score += Math.min(occurrences, 3); // Cap at 3 to prevent overweighting
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

// Helper function to assign weights to keywords based on legal relevance
const getKeywordWeight = (keyword: string): number => {
  // Legal terms have higher weights
  const legalTerms = ["law", "legal", "right", "compensation", "fine", "penalty", "violation", 
    "court", "protection", "act", "victim", "accident", "harassment", "safety", "traffic", "vehicle"];
    
  if (legalTerms.includes(keyword)) {
    return 2;
  }
  
  return 1;
};

export const generateBotResponse = (query: string): { message: string; laws: Law[] } => {
  const relevantLaws = findRelevantLaws(query);
  
  if (relevantLaws.length === 0) {
    // No laws found, provide a helpful response
    const generalResponses = [
      "I couldn't find specific laws related to your query. Could you please provide more details about your situation?",
      "I don't have specific legal information on that topic. Could you rephrase your question or provide more context?",
      "I'm not finding relevant laws for that query. Could you tell me more about the specific legal issue you're concerned about?"
    ];
    
    return {
      message: generalResponses[Math.floor(Math.random() * generalResponses.length)],
      laws: []
    };
  }
  
  // Always use the standard response message regardless of query content
  return {
    message: "Based on your query, here are some relevant laws that might help:",
    laws: relevantLaws
  };
};
