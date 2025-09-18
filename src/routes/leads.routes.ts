import express from "express";
import {
  getResults,
  scoreLeads,
  uploadLeads,
} from "../controllers/leads.controller.js";

const router = express.Router();

router.post("/upload", uploadLeads);
router.post("/score", scoreLeads);
router.get("/results", getResults);

export default router;
