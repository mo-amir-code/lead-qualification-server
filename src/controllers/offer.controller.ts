import { RESPONSE_MESSAGES } from "../config/constants.js";
import {
  apiHandler,
  ErrorHandlerClass,
  ok,
} from "../middlewares/errorHandling/index.js";
import { OfferType } from "../types/utils/data/index.js";
import { currentOffer, handleSetCurrentOffer } from "../utils/data/index.js";

const uploadOffer = apiHandler(async (req, res, next) => {
  if (currentOffer) {
    return next(
      new ErrorHandlerClass(
        "Offer is already saved!",
        RESPONSE_MESSAGES.CODES.BAD_REQUEST
      )
    );
  }

  // sending given offer in the request body to the current offer variable
  handleSetCurrentOffer(req.body as OfferType);

  return ok({
    res,
    message: "offer saved",
  });
});

export { uploadOffer };
