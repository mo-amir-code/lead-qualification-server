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

// API endpoint for Google Gemini 2.5 model text generation
const url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

// Function to send a scoring query to Google GenAI and parse the response
const calculateLeadScoreWithAI = async ({
  query,
}: CalculateLeadScoreWithAIType): Promise<CalculateScoreOfLeadsWithAIResponseType> => {
  // Make POST request to the GenAI endpoint with the user's query
  const response = await axios.post(
    url,
    {
      contents: [
        {
          parts: [
            {
              text: query, // The text query passed in from caller
            },
          ],
        },
      ],
    },
    {
      // HTTP headers including API key for authentication
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": ENV_VARS.GEMINI_API_KEY || "",
      },
    }
  );

  // Clone and parse the raw response data to avoid mutations
  const aiResponse = JSON.parse(JSON.stringify(response.data));

  // Extract the generated text content from the first candidate's first part
  const result = aiResponse.candidates[0].content.parts[0].text;

  // Remove markdown-style JSON code fences to clean the output
  const cleaned = result?.replace(/``````/g, "");

  // Parse the cleaned JSON string into an object - fallback to empty object if empty
  const output = JSON.parse(cleaned || "{}");

  // Return the parsed AI output typed as expected by the caller
  return output;
};

export { calculateLeadScoreWithAI };
