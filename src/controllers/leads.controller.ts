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


// Controller to upload leads CSV and parse into currentLeads array
const uploadLeads = apiHandler(async (req, res, next) => {
  // If leads are already uploaded, reject further uploads
  if (currentLeads.length > 0) {
    return next(
      new ErrorHandlerClass(
        "Leads are already saved",
        RESPONSE_MESSAGES.CODES.BAD_REQUEST
      )
    );
  }

  try {
    // Check if CSV file is included in the request
    if (!req.file) {
      return next(
        new ErrorHandlerClass(
          "CSV file required",
          RESPONSE_MESSAGES.CODES.BAD_REQUEST
        )
      );
    }

    // Convert uploaded file buffer to readable stream
    const stream = Readable.from(req.file.buffer.toString());

    // Pipe the stream to csv-parser to parse each row
    stream
      .pipe(csvParser())
      .on("data", (row) => {
        // Map each CSV row to a LeadType object with defaults for missing fields
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
        // Add the parsed lead to the in-memory leads list
        handlePushLead(lead);
      })
      .on("end", () => {
        // When parsing finishes, send success response with lead count
        return ok({
          res,
          message: `${currentLeads.length} leads uploaded successfully`,
          data: {
            count: currentLeads.length,
          },
        });
      });
  } catch (err) {
    // Pass any parsing or unexpected errors to the error handler middleware
    next(err);
  }
});


// Controller to start scoring the uploaded leads with the current offer
const scoreLeads = apiHandler(async (req, res, next) => {
  // Validate that leads and an offer have been uploaded before scoring
  if (currentLeads.length === 0 || !currentOffer) {
    return next(
      new ErrorHandlerClass(
        "Please first upload offer and csv file of leads",
        RESPONSE_MESSAGES.CODES.BAD_REQUEST
      )
    );
  }

  // Prevent concurrent scoring requests if one is already in progress
  if (isCalculating) {
    return next(
      new ErrorHandlerClass(
        "Calculating leads score...",
        RESPONSE_MESSAGES.CODES.BAD_REQUEST
      )
    );
  }

  // Mark scoring as started to block other scoring requests
  handleSetLeadsCalculationStatus(true);

  // Trigger the scoring logic that calculates scores for each lead
  handleToCalculateScoreOfLeads({ leads: currentLeads, offer: currentOffer });

  // Respond immediately to client that scoring has started (async)
  return ok({
    res,
    message: "Scoring started",
  });
});


// Controller to get current leads and their scoring status/results
const getResults = apiHandler(async (req, res, next) => {
  // Return in-memory leads array and flag indicating if scoring is processing
  return ok({
    data: {
      leads: currentLeads,
      isProcessing: isCalculating,
    },
    res,
    message: "result fetched",
  });
});


// Controller to reset/clear all uploaded leads and offers in memory
const resetLeadsAndOffer = apiHandler(async (req, res, next) => {
  // Clear leads, offer, and reset related status flags
  handleResetData();
  return ok({
    res,
    message: "Leads and offer has been reset successfully",
  });
});

export { uploadLeads, scoreLeads, getResults, resetLeadsAndOffer };
