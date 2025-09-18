import express from "express";
import {
  getResults,
  resetLeadsAndOffer,
  scoreLeads,
  uploadLeads,
} from "../controllers/leads.controller.js";
import { upload } from "../types/services/upload/index.js";

const router = express.Router();

router.post("/upload", upload.single("leads"), uploadLeads);
router.post("/score", scoreLeads);
router.get("/results", getResults);
router.post("/reset", resetLeadsAndOffer);

export default router;
