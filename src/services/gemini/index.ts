import { ai } from "../../config/gemini.js";
import { CalculateLeadScoreWithAIType } from "../../types/services/gemini/index.js";

const calculateLeadScoreWithAI = async ({
  query,
}: CalculateLeadScoreWithAIType) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: query,
  });

  const cleaned = response.text?.replace(/```json\n?|\n```/g, "");

  // Parse into an object
  const output = JSON.parse(cleaned || "{}");

  console.log(output);
  return response;
};

export { calculateLeadScoreWithAI };
