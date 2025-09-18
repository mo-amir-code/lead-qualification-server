import { ai } from "../../config/gemini.js";
import { CalculateScoreOfLeadsWithAIResponseType } from "../../types/controllers/controllers/leads/index.js";
import { CalculateLeadScoreWithAIType } from "../../types/services/gemini/index.js";

const calculateLeadScoreWithAI = async ({
  query,
}: CalculateLeadScoreWithAIType): Promise<CalculateScoreOfLeadsWithAIResponseType> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: query,
  });

  const cleaned = response.text?.replace(/```json\n?|\n```/g, "");

  // Parse into an object
  const output = JSON.parse(cleaned || "{}");

  return output;
};

export { calculateLeadScoreWithAI };
