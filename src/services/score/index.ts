import { CalculateRuleBasedLeadScoreType } from "../../types/services/score/index.js";
import {
  decisionMakerKeywords,
  influencerKeywords,
} from "../../utils/data/index.js";

const calculateRuleBasedLeadScore = ({
  lead,
  offer,
}: CalculateRuleBasedLeadScoreType): number => {
  let score = 0;

  let role = lead.role;
  let matchedForDecisionMaker = true;

  let hasMatched = decisionMakerKeywords.some((keyword) =>
    role?.toLowerCase().includes(keyword.toLowerCase())
  );

  // console.log("Decision Making Role Matched: ", hasMatched);

  if (!hasMatched) {
    hasMatched = influencerKeywords.some((keyword) =>
      role?.toLowerCase().includes(keyword.toLowerCase())
    );

    // console.log("Influencer Role Matched: ", hasMatched);

    matchedForDecisionMaker = false;
  }

  if (matchedForDecisionMaker) {
    // console.log("Increasing Decision Maker Score by 20");
    score += 20;
  } else if (hasMatched) {
    // console.log("Increasing Influencer Score by 10");
    score += 10;
  }

  //   Industry matching
  let useCases = offer.idealUseCases;
  hasMatched = false;

  // First, try exact matching (including partial exact matches)
  hasMatched = useCases.some((useCase) => {
    if (!lead.industry) return false;

    const leadIndustry = lead.industry?.toLowerCase().trim();
    const targetUseCase = useCase.toLowerCase().trim();

    return (
      leadIndustry === targetUseCase ||
      targetUseCase.includes(leadIndustry) ||
      leadIndustry.includes(targetUseCase)
    );
  });

  // console.log("Exact industry matching: ", hasMatched);

  if (hasMatched) {
    // console.log("Increasing score by 20 for exact industry matching");
    score += 20;
  } else {
    hasMatched = useCases.some((useCase) =>
      lead.industry
        ?.toLowerCase()
        .split(" ")
        .some((keyword) => useCase.toLowerCase().includes(keyword))
    );

    // console.log("Adjacent industry matching: ", hasMatched);

    if (hasMatched) {
      // console.log("Increasing score by 10 for adjacent matching");
      score += 10;
    }
  }

  const allFields = [
    lead.name,
    lead.role,
    lead.company,
    lead.industry,
    lead.location,
    lead.linkedin_bio,
  ];
  if (allFields.every((f) => f && f.trim() !== "")) {
    // console.log("Increasing score by 10 for all fields");
    score += 10;
  }

  return score;
};

export { calculateRuleBasedLeadScore };
