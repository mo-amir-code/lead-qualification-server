import { calculateLeadScoreWithAI } from "../../../services/gemini/index.js";
import { calculateRuleBasedLeadScore } from "../../../services/score/index.js";
import { CalculateScoreOfLeadsType } from "../../../types/controllers/controllers/leads/index.js";
import { LeadType } from "../../../types/utils/data/index.js";
import {
  handleSetLeadsCalculationStatus,
  handleToSetLeads,
} from "../../data/index.js";
import { generateAIPrompt } from "../../gemini/index.js";

const handleToCalculateScoreOfLeads = async ({
  leads,
  offer,
}: CalculateScoreOfLeadsType) => {
  const results: LeadType[] = [];

  for (const lead of leads) {
    const currentLead = JSON.parse(JSON.stringify(lead));
    const ruleBasedScore = calculateRuleBasedLeadScore({
      offer,
      lead: currentLead,
    });

    const promptWithLeadAndOfferData = generateAIPrompt(currentLead, offer);
    const aiCalculatedResponse = await calculateLeadScoreWithAI({
      query: promptWithLeadAndOfferData,
    });

    let aiBasedScore = 0;

    switch (aiCalculatedResponse.intent) {
      case "High":
        aiBasedScore = 50;
        break;
      case "Medium":
        aiBasedScore = 30;
        break;
      default:
        aiBasedScore = 10;
    }

    let totalScore = ruleBasedScore + aiBasedScore;

    const updatedLead = {
      ...currentLead,
      score: totalScore,
      intent: aiCalculatedResponse.intent,
      reasoning: aiCalculatedResponse.reasoning,
    };

    results.push(updatedLead);
    console.log(results.length);
  }


  handleToSetLeads(results);
  handleSetLeadsCalculationStatus(false);
  console.log("Done(✅)")
};

export { handleToCalculateScoreOfLeads };
