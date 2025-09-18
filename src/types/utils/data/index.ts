type IntentType = "Low" | "Medium" | "High";

type OfferType = {
  name: string;
  valueProps: [string];
  idealUseCases: [string];
};

type LeadType = {
  name: String;
  role: string | null;
  company: string | null;
  industry: string | null;
  location: string | null;
  linkedin_bio: string | null;
  score: number | null;
  intent: IntentType | null;
  reasoning: string | null;
};

export type { OfferType, LeadType, IntentType };
