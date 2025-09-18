import { calculateLeadScoreWithAI } from "../../../services/gemini/index.js";
import { calculateRuleBasedLeadScore } from "../../../services/score/index.js";
import { CalculateScoreOfLeadsType } from "../../../types/controllers/controllers/leads/index.js";
import { generateAIPrompt } from "../../gemini/index.js";

const handleToCalculateScoreOfLeads = async ({
  leads,
  offer,
}: CalculateScoreOfLeadsType) => {
  await Promise.all(
    leads.slice(0, 1).map(async (lead) => {
      const currentLead = JSON.parse(JSON.stringify(lead));
      const ruleBasedScore = calculateRuleBasedLeadScore({
        offer,
        lead: currentLead,
      });

      const promptWithLeadAndOfferData = generateAIPrompt(currentLead, offer);
      const aiBasedScore = await calculateLeadScoreWithAI({
        query: promptWithLeadAndOfferData,
      });

      const totalScore = ruleBasedScore;

      return {
        ...currentLead,
      };
    })
  );
};

export { handleToCalculateScoreOfLeads };
