
import { useQuery } from "@tanstack/react-query";

// Mock data - Replace with actual API endpoint
const fetchLegalNews = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    {
      title: "Supreme Court Issues New Guidelines on Bail Applications",
      summary: "The Supreme Court has released comprehensive guidelines for handling bail applications across all courts in India.",
      source: "Legal Times",
      date: "2024-03-15",
      url: "#"
    },
    {
      title: "Parliament Passes Criminal Law Reform Bill",
      summary: "Major overhaul of criminal laws approved with new provisions for faster trials and victim protection.",
      source: "Law Journal",
      date: "2024-03-14",
      url: "#"
    },
    {
      title: "High Courts to Implement AI for Case Management",
      summary: "Digital transformation initiative announced to reduce case pendency using artificial intelligence.",
      source: "Tech Law Today",
      date: "2024-03-13",
      url: "#"
    }
  ];
};

export const useLegalNews = () => {
  return useQuery({
    queryKey: ["legalNews"],
    queryFn: fetchLegalNews,
  });
};
