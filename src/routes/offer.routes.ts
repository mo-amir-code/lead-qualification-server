import express from "express";
import { uploadOffer } from "../controllers/offer.controller.js";
import { zodValidation } from "../validators/zod/index.js";
import { uploadOfferZodSchema } from "../validators/zod/auth.zod.js";

const router = express.Router();

router.post("/", zodValidation(uploadOfferZodSchema), uploadOffer);

export default router;
