import { apiHandler, ok } from "../middlewares/errorHandling/index.js";
import { OfferType } from "../types/utils/data/index.js";
import { handleSetCurrentOffer } from "../utils/data/index.js";

const uploadOffer = apiHandler(async (req, res, next) => {
  handleSetCurrentOffer(req.body as OfferType);

  return ok({
    res,
    message: "offer saved",
  });
});

export { uploadOffer };
