type IntentType = "Low" | "Medium" | "High";

type OfferType = {
  name: string;
  valueProps: [string];
  idealUseCases: [string];
};

type LeadType = {
  name: String;
  role: string;
  company: string;
  industry: string;
  location: string;
  linkedin_bio: string;
  score: number | null;
  intent: IntentType | null;
  reasoning: string | null;
};

export type { OfferType, LeadType, IntentType };
