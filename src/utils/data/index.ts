import { LeadType, OfferType } from "../../types/utils/data/index.js";

let currentOffer: null | OfferType = null;
let currentLeads: LeadType[] = [];

const handleSetCurrentOffer = (offer: OfferType) => {
  currentOffer = offer;
};

const handlePushLead = (lead: LeadType) => {
  currentLeads.push(lead);
};

const handleResetData = () => {
  currentOffer = null;
  currentLeads = [];
};

export { currentOffer, currentLeads, handleSetCurrentOffer, handlePushLead };
