import { RESPONSE_MESSAGES } from "../config/constants.js";
import {
  apiHandler,
  ErrorHandlerClass,
  ok,
} from "../middlewares/errorHandling/index.js";
import { OfferType } from "../types/utils/data/index.js";
import { currentOffer, handleSetCurrentOffer } from "../utils/data/index.js";

const uploadOffer = apiHandler(async (req, res, next) => {
  // Check if an offer is already stored in the currentOffer variable
  if (currentOffer) {
    // If yes, return an error response indicating the offer is already saved
    return next(
      new ErrorHandlerClass(
        "Offer is already saved!",
        RESPONSE_MESSAGES.CODES.BAD_REQUEST
      )
    );
  }

  // Save the offer data received from the client (request body) into the currentOffer variable
  handleSetCurrentOffer(req.body as OfferType);

  // Send back a success response to confirm the offer was saved
  return ok({
    res,
    message: "offer saved",
  });
});

export { uploadOffer };
