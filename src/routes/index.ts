import express from "express";
import offerRoutes from "./offer.routes.js";
import leadsRoutes from "./leads.routes.js";

const router = express.Router();

router.use("/api/offer", offerRoutes);
router.use("/api/leads", leadsRoutes);

export default router;
