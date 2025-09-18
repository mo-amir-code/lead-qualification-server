import { LeadType, OfferType } from "../../types/utils/data/index.js";

function generateAIPrompt(lead: LeadType, offer: OfferType): string {
  return `
You are an AI sales assistant. Evaluate the buying intent of this prospect based on the offer and their profile.

Offer:
Name: ${offer.name}
Value Props: ${offer.valueProps.join(", ")}
Ideal Use Cases: ${offer.idealUseCases.join(", ")}

Prospect:
Name: ${lead.name}
Role: ${lead.role}
Company: ${lead.company}
Industry: ${lead.industry}
Location: ${lead.location}
LinkedIn Bio: ${lead.linkedin_bio}

Task:
1. Classify intent as High / Medium / Low.
2. Give reasoning in 1–2 sentences based on how well the prospect fits the offer.

Output in JSON format:
{
  "intent": "High",
  "reasoning": "Reasoning text"
}`;
}

export { generateAIPrompt };
