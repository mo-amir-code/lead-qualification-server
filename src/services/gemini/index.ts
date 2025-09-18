import { ai } from "../../config/gemini.js";
import { CalculateLeadsType } from "../../types/services/gemini/index.js";

const calculateLeads = async ({ query }: CalculateLeadsType) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: query,
  });
  return response;
};

export { calculateLeads };
