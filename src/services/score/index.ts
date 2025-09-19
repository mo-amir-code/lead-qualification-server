import { CalculateRuleBasedLeadScoreType } from "../../types/services/score/index.js";
import {
  decisionMakerKeywords,
  influencerKeywords,
} from "../../utils/data/index.js";

// Function to calculate a lead's rule-based score based on role, industry, and completeness
const calculateRuleBasedLeadScore = ({
  lead,
  offer,
}: CalculateRuleBasedLeadScoreType): number => {
  let score = 0;

  // Extract the lead's role for keyword matching
  let role = lead.role;
  // Flag to track if lead matches decision maker keywords
  let matchedForDecisionMaker = true;

  // Check if the lead's role contains any keywords indicating decision maker
  let hasMatched = decisionMakerKeywords.some((keyword) =>
    role?.toLowerCase().includes(keyword.toLowerCase())
  );

  // If not matched as decision maker, check for influencer role keywords
  if (!hasMatched) {
    hasMatched = influencerKeywords.some((keyword) =>
      role?.toLowerCase().includes(keyword.toLowerCase())
    );

    matchedForDecisionMaker = false;
  }

  // Assign points based on role relevance
  if (matchedForDecisionMaker) {
    // Decision maker role yields 20 points
    score += 20;
  } else if (hasMatched) {
    // Influencer role yields 10 points
    score += 10;
  }

  // Industry matching starts here
  let useCases = offer.idealUseCases; // Target industries from offer
  hasMatched = false;

  // First check exact or partial exact industry matching between prospect and offer
  hasMatched = useCases.some((useCase) => {
    if (!lead.industry) return false;

    const leadIndustry = lead.industry?.toLowerCase().trim();
    const targetUseCase = useCase.toLowerCase().trim();

    // Match if industries are equal or one includes the other
    return (
      leadIndustry === targetUseCase ||
      targetUseCase.includes(leadIndustry) ||
      leadIndustry.includes(targetUseCase)
    );
  });

  // If exact match, assign 20 points
  if (hasMatched) {
    score += 20;
  } else {
    // Otherwise, check for adjacent or related industry keywords match
    hasMatched = useCases.some((useCase) =>
      lead.industry
        ?.toLowerCase()
        .split(" ")
        .some((keyword) => useCase.toLowerCase().includes(keyword))
    );

    // Assign 10 points for adjacent industry match
    if (hasMatched) {
      score += 10;
    }
  }

  // Check if all required data fields are present and non-empty
  const allFields = [
    lead.name,
    lead.role,
    lead.company,
    lead.industry,
    lead.location,
    lead.linkedin_bio,
  ];

  // If all fields have valid content, assign 10 points
  if (allFields.every((f) => f && f.trim() !== "")) {
    score += 10;
  }

  // Return the final rule-based score for this lead
  return score;
};

export { calculateRuleBasedLeadScore };
