import { useQuery } from "@tanstack/react-query";
import { INDIAN_STATES } from "@/lib/constants";

// Temporary mock data - Replace with actual API call
const fetchStateData = async (stateCode: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock data for a few states
  const statesData: Record<string, any> = {
    AP: {
      code: "AP",
      name: "Andhra Pradesh",
      history: "Andhra Pradesh was created in 1956 through the States Reorganisation Act. The state was further reorganized in 2014 to create Telangana.",
      governmentStructure: "The state government of Andhra Pradesh operates within the framework of parliamentary democracy with a Governor as the constitutional head and the Chief Minister as the head of government.",
      constitutionalFramework: "Andhra Pradesh follows the constitutional framework of India and has provisions for local self-governance through Panchayati Raj institutions.",
      articles: [
        { title: "Article 1: Formation of State", content: "Describes the formation of Andhra Pradesh as a state within the Union of India." },
        { title: "Article 2: Administrative Divisions", content: "Outlines the administrative divisions of the state into districts, mandals, and villages." }
      ],
      laws: [
        { title: "Andhra Pradesh Land Reforms Act", description: "Legislation aimed at land ceiling and redistribution." },
        { title: "Andhra Pradesh Panchayat Raj Act", description: "Governs the structure and functioning of local self-government in rural areas." }
      ]
    },
    KA: {
      code: "KA",
      name: "Karnataka",
      history: "Karnataka was formed on November 1, 1956, with the passage of the States Reorganisation Act. Originally known as the State of Mysore, it was renamed Karnataka in 1973.",
      governmentStructure: "Karnataka has a parliamentary system of government with a bicameral legislature consisting of the Karnataka Legislative Assembly and the Karnataka Legislative Council.",
      constitutionalFramework: "Karnataka follows the constitutional framework set by the Constitution of India and has provisions for local self-governance through urban local bodies and Panchayat Raj institutions.",
      articles: [
        { title: "Article 1: Establishment of State", content: "Defines the establishment of Karnataka as a state within the Indian Union." },
        { title: "Article 2: Official Language", content: "Establishes Kannada as the official language of the state." }
      ],
      laws: [
        { title: "Karnataka Land Reforms Act", description: "Aimed at reforming land ownership and tenancy in the state." },
        { title: "Karnataka Municipalities Act", description: "Governs the structure and functioning of municipalities in the state." }
      ]
    },
    MH: {
      code: "MH",
      name: "Maharashtra",
      history: "Maharashtra was formed on May 1, 1960, under the Bombay Reorganisation Act. It was created on linguistic principles, with Marathi-speaking regions forming the state.",
      governmentStructure: "The state has a parliamentary system with a bicameral legislature consisting of the Maharashtra Legislative Assembly and the Maharashtra Legislative Council.",
      constitutionalFramework: "Maharashtra follows the Indian constitutional framework with provisions for local governance through municipal corporations, municipalities, and Panchayati Raj institutions.",
      articles: [
        { title: "Article 1: State Boundaries", content: "Defines the geographical boundaries of Maharashtra." },
        { title: "Article 2: State Capital", content: "Establishes Mumbai as the capital of the state." }
      ],
      laws: [
        { title: "Maharashtra Tenancy and Agricultural Lands Act", description: "Regulates tenancy rights of agricultural lands." },
        { title: "Maharashtra Rent Control Act", description: "Regulates rent and eviction of premises in certain areas of the state." }
      ]
    }
  };
  
  // Return data for the selected state or throw error if not found
  if (statesData[stateCode]) {
    return statesData[stateCode];
  }
  
  // If state not in mock data, return empty template with just name
  const stateName = INDIAN_STATES.find(state => state.code === stateCode)?.name || "Unknown State";
  
  return {
    code: stateCode,
    name: stateName,
    history: `The detailed history of ${stateName} will be available soon.`,
    governmentStructure: `Information about the government structure of ${stateName} will be available soon.`,
    constitutionalFramework: `Details about the constitutional framework of ${stateName} will be available soon.`,
    articles: [],
    laws: []
  };
};

export const useStateData = (stateCode: string) => {
  return useQuery({
    queryKey: ["stateData", stateCode],
    queryFn: () => fetchStateData(stateCode),
    enabled: !!stateCode,
  });
};
