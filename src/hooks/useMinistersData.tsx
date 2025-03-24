
import { useQuery } from "@tanstack/react-query";

// Mock data - Replace with actual API endpoints
const fetchCentralMinisters = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    ministers: [
      {
        name: "Narendra Modi",
        department: "Prime Minister's Office",
        portfolio: "Prime Minister",
        term: "2019-Present"
      },
      {
        name: "Amit Shah",
        department: "Home Affairs",
        portfolio: "Minister of Home Affairs",
        term: "2019-Present"
      }
    ],
    departments: ["Prime Minister's Office", "Home Affairs", "Finance", "Defense", "External Affairs"]
  };
};

const fetchStateMinistersData = async (stateCode: string) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const mockData: Record<string, any> = {
    MH: {
      ministers: [
        {
          name: "Eknath Shinde",
          department: "Chief Minister's Office",
          portfolio: "Chief Minister",
          term: "2022-Present"
        }
      ],
      departments: ["Chief Minister's Office", "Home", "Finance", "Urban Development"]
    },
    KA: {
      ministers: [
        {
          name: "Siddaramaiah",
          department: "Chief Minister's Office",
          portfolio: "Chief Minister",
          term: "2023-Present"
        }
      ],
      departments: ["Chief Minister's Office", "Home", "Finance", "Education"]
    }
  };
  
  return mockData[stateCode] || { ministers: [], departments: [] };
};

export const useCentralMinistersData = () => {
  return useQuery({
    queryKey: ["centralMinisters"],
    queryFn: fetchCentralMinisters,
  });
};

export const useStateMinistersData = (stateCode: string) => {
  return useQuery({
    queryKey: ["stateMinisters", stateCode],
    queryFn: () => fetchStateMinistersData(stateCode),
    enabled: !!stateCode,
  });
};
