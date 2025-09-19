// import { ai } from "../../config/gemini.js";
// import { CalculateScoreOfLeadsWithAIResponseType } from "../../types/controllers/controllers/leads/index.js";
// import { CalculateLeadScoreWithAIType } from "../../types/services/gemini/index.js";

// const calculateLeadScoreWithAI = async ({
//   query,
// }: CalculateLeadScoreWithAIType): Promise<CalculateScoreOfLeadsWithAIResponseType> => {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: query,
//   });

//   const cleaned = response.text?.replace(/```json\n?|\n```/g, "");

//   // Parse into an object
//   const output = JSON.parse(cleaned || "{}");

//   return output;
// };

// export { calculateLeadScoreWithAI };

import axios from "axios";
import { CalculateScoreOfLeadsWithAIResponseType } from "../../types/controllers/controllers/leads/index.js";
import { CalculateLeadScoreWithAIType } from "../../types/services/gemini/index.js";
import { ENV_VARS } from "../../config/constants.js";

const url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const calculateLeadScoreWithAI = async ({
  query,
}: CalculateLeadScoreWithAIType): Promise<CalculateScoreOfLeadsWithAIResponseType> => {
  const response = await axios.post(
    url,
    {
      contents: [
        {
          parts: [
            {
              text: query,
            },
          ],
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": ENV_VARS.GEMINI_API_KEY || "",
      },
    }
  );

  const aiResponse = JSON.parse(JSON.stringify(response.data));
  const result = aiResponse.candidates[0].content.parts[0].text;

  const cleaned = result?.replace(/```json\n?|\n```/g, "");

  const output = JSON.parse(cleaned || "{}");

  return output;
};

export { calculateLeadScoreWithAI };
