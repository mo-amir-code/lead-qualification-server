import { apiHandler, ok } from "../middlewares/errorHandling/index.js";
import { calculateLeads } from "../services/gemini/index.js";

const uploadLeads = apiHandler(async (req, res, next) => {
  return ok({
    res,
    message: "Leads uploaded",
  });
});

const scoreLeads = apiHandler(async (req, res, next) => {
  return ok({
    res,
    message: "Scoring started",
  });
});

const getResults = apiHandler(async (req, res, next) => {
  const response = await calculateLeads({ query: "what can you do?" });

  return ok({
    data: response,
    res,
    message: "results",
  });
});

export { uploadLeads, scoreLeads, getResults };
