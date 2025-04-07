
import { useQuery } from "@tanstack/react-query";

// Mock data - Replace with actual API endpoint
const fetchLegalNews = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    {
      title: "New Traffic Rules: Increased Penalties for Mobile Phone Usage While Driving",
      summary: "The government has announced stricter penalties for using mobile phones while driving, with fines now ranging from ₹5,000 to ₹10,000.",
      source: "Road Safety Times",
      date: "2025-04-06",
      url: "#"
    },
    {
      title: "Supreme Court Strengthens Women's Rights in Property Inheritance",
      summary: "Landmark judgment grants equal inheritance rights to daughters in ancestral property, regardless of when they were born.",
      source: "Legal Rights Today",
      date: "2025-04-05",
      url: "#"
    },
    {
      title: "New Child Protection Law Comes into Effect",
      summary: "The POCSO Amendment Act introduces stricter punishment for sexual offenses against children and expedites trial procedures.",
      source: "Child Rights Forum",
      date: "2025-04-04",
      url: "#"
    },
    {
      title: "Consumer Courts Now Accept Online Complaints",
      summary: "Digital initiative allows consumers to file complaints electronically, reducing the need for physical appearances in minor disputes.",
      source: "Consumer Affairs Daily",
      date: "2025-04-03",
      url: "#"
    },
    {
      title: "Nationwide Awareness Campaign on Senior Citizens' Rights Launched",
      summary: "Government launches program to educate elderly citizens about their legal rights and available support services.",
      source: "Elder Care Network",
      date: "2025-04-01",
      url: "#"
    }
  ];
};

export const useLegalNews = () => {
  const query = useQuery({
    queryKey: ["legalNews"],
    queryFn: fetchLegalNews,
  });
  
  return {
    news: query.data || [],
    isLoading: query.isLoading,
    error: query.error
  };
};
