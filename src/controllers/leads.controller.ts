import { RESPONSE_MESSAGES } from "../config/constants.js";
import {
  apiHandler,
  ErrorHandlerClass,
  ok,
} from "../middlewares/errorHandling/index.js";
import csvParser from "csv-parser";
import { Readable } from "stream";
import {
  currentLeads,
  currentOffer,
  handlePushLead,
  handleResetData,
  handleSetLeadsCalculationStatus,
  isCalculating,
} from "../utils/data/index.js";
import { LeadType } from "../types/utils/data/index.js";
import { handleToCalculateScoreOfLeads } from "../utils/controllers/leads/index.js";

const uploadLeads = apiHandler(async (req, res, next) => {
  if (currentLeads.length > 0) {
    return next(
      new ErrorHandlerClass(
        "Leads are already saved",
        RESPONSE_MESSAGES.CODES.BAD_REQUEST
      )
    );
  }

  try {
    if (!req.file) {
      return next(
        new ErrorHandlerClass(
          "CSV file required",
          RESPONSE_MESSAGES.CODES.BAD_REQUEST
        )
      );
    }
    const stream = Readable.from(req.file.buffer.toString());

    stream
      .pipe(csvParser())
      .on("data", (row) => {
        const lead: LeadType = {
          name: row.name,
          role: row?.role || null,
          company: row?.company || null,
          industry: row?.industry || null,
          location: row?.location || null,
          linkedin_bio: row?.linkedin_bio || null,
          score: null,
          intent: null,
          reasoning: null,
        };
        handlePushLead(lead);
      })
      .on("end", () => {
        return ok({
          res,
          message: `${currentLeads.length} leads uploaded successfully`,
          data: {
            count: currentLeads.length,
          },
        });
      });
  } catch (err) {
    next(err);
  }
});

const scoreLeads = apiHandler(async (req, res, next) => {
  if (currentLeads.length === 0 || !currentOffer) {
    return next(
      new ErrorHandlerClass(
        "Please first upload offer and csv file of leads",
        RESPONSE_MESSAGES.CODES.BAD_REQUEST
      )
    );
  }

  if (isCalculating) {
    return next(
      new ErrorHandlerClass(
        "Calculating leads score...",
        RESPONSE_MESSAGES.CODES.BAD_REQUEST
      )
    );
  }

  handleSetLeadsCalculationStatus(true);
  handleToCalculateScoreOfLeads({ leads: currentLeads, offer: currentOffer });

  return ok({
    res,
    message: "Scoring started",
  });
});

const getResults = apiHandler(async (req, res, next) => {
  return ok({
    data: {
      leads: currentLeads,
      isProcessing: isCalculating,
    },
    res,
    message: "result fetched",
  });
});

const resetLeadsAndOffer = apiHandler(async (req, res, next) => {
  handleResetData();
  return ok({
    res,
    message: "Leads and offer has been reset successfully",
  });
});

export { uploadLeads, scoreLeads, getResults, resetLeadsAndOffer };
