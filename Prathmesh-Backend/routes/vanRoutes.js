import express from "express";
import * as vanController from "../controllers/vanController.js";

const router = express.Router();

router.get("/getall", vanController.getAllVans);
router.post("/add", vanController.addVan);
router.put("/:id", vanController.updateVan);
router.delete("/:id", vanController.deleteVan);
router.get("/by-owner/:ownerId", vanController.getVansByOwnerId);

export default router;
