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

const handleToSetLeads = (leads: LeadType[]) => {
  currentLeads = leads;
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
  isCalculating,
  handleSetCurrentOffer,
  handlePushLead,
  handleToSetLeads,
  handleResetData,
  handleSetLeadsCalculationStatus,
};

// Roles data
const decisionMakerKeywords = [
  "chief",
  "officer",
  "head",
  "director",
  "president",
  "founder",
  "owner",
  "executive",
  "board",
  "vp",
  "vice",
  "managing",
  "manager",
  "leader",
  "chairman",
  "partner",
  "administrator",
  "governor",
  "principal",
  "commissioner",
  "regulator",
  "commander",
  "captain",
  "mayor",
  "minister",
  "judge",
  "ceo",
  "coo",
  "cto",
  "cfo",
  "cio",
  "cmo",
  "cpo",
  "chro",
  "ciso",
  "cso",
  "cro",
  "cdo",
  "cco",
  "cxo",
  "cto",
  "svp",
  "evp",
  "md",
  "gm",
];

const influencerKeywords = [
  "expert",
  "analyst",
  "consultant",
  "advisor",
  "strategist",
  "specialist",
  "thought",
  "influencer",
  "advocate",
  "lead",
  "coordinator",
  "champion",
  "architect",
  "researcher",
  "assistant",
  "representative",
  "facilitator",
  "communicator",
  "mediator",
  "promoter",
  "organiser",
  "mentor",
  "coach",
  "trainer",
  "reviewer",
  "evangelist",
  "ambassador",
  "blogger",
  "podcaster",
  "youtuber",
  "speaker",
  "moderator",
  "panelist",
  "community",
  "content",
  "creator",
  "marketer",
];

export { decisionMakerKeywords, influencerKeywords };
