import { LeadType, OfferType } from "../../types/utils/data/index.js";

let currentOffer: null | OfferType = null;
let currentLeads: LeadType[] = [];
let isCalculating: boolean = false;

const handleSetCurrentOffer = (offer: OfferType) => {
  currentOffer = offer;
};

const handlePushLead = (lead: LeadType) => {
  currentLeads.push(lead);
};

const handleSetLeadsCalculationStatus = (status: boolean) => {
  isCalculating = status;
};

const handleResetData = () => {
  currentOffer = null;
  currentLeads = [];
  isCalculating = false;
};

export {
  currentOffer,
  currentLeads,
  handleSetCurrentOffer,
  handlePushLead,
  handleResetData,
  handleSetLeadsCalculationStatus,
};

// Roles data
const decisionMakerKeywords = [
  "Chief",
  "Officer",
  "Head",
  "Director",
  "President",
  "Founder",
  "Owner",
  "Executive",
  "Board",
  "VP",
  "Vice",
  "Managing",
  "Manager",
  "Leader",
  "Allocator",
  "Negotiator",
  "Controller",
  "Supervisor",
  "Chairman",
  "Partner",
  "Administrator",
  "Governor",
  "Principal",
  "Commissioner",
  "Regulator",
  "Commander",
  "Captain",
  "Mayor",
  "Minister",
  "Judge",
];

const influencerKeywords = [
  "Expert",
  "Analyst",
  "Consultant",
  "Advisor",
  "Strategist",
  "Specialist",
  "Thought",
  "Leader",
  "Influencer",
  "Advocate",
  "Lead",
  "Coordinator",
  "Champion",
  "Architect",
  "Researcher",
  "Assistant",
  "Representative",
  "Facilitator",
  "Communicator",
  "Mediator",
  "Promoter",
  "Organiser",
  "Mentor",
  "Coach",
  "Trainer",
  "Reviewer",
  "Partner",
];

export { decisionMakerKeywords, influencerKeywords };
