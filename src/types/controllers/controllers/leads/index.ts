import { IntentType, LeadType, OfferType } from "../../../utils/data/index.js";

type CalculateScoreOfLeadsType = {
  offer: OfferType;
  leads: LeadType[];
};

type CalculateScoreOfLeadsWithAIResponseType = {
  intent: IntentType;
  reasoning: string;
};

export type { CalculateScoreOfLeadsType, CalculateScoreOfLeadsWithAIResponseType };
