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

  if (!hasMatched) {
    hasMatched = influencerKeywords.some((keyword) =>
      role?.toLowerCase().includes(keyword.toLowerCase())
    );
    matchedForDecisionMaker = false;
  }

  if (matchedForDecisionMaker) {
    score += 20;
  } else if (hasMatched) {
    score += 10;
  }

  //   Industry matching
  let useCases = offer.idealUseCases;
  hasMatched = useCases.some(
    (useCase) => lead.industry?.toLowerCase() === useCase.toLowerCase()
  );

  if (hasMatched) {
    score += 20;
  } else {
    hasMatched = useCases.some((useCase) =>
      lead.industry
        ?.toLowerCase()
        .split(" ")
        .some((keyword) => useCase.toLowerCase().includes(keyword))
    );

    if (hasMatched) {
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
  if (allFields.every((f) => f && f.trim() !== "")) score += 10;

  return score;
};

export { calculateRuleBasedLeadScore };
