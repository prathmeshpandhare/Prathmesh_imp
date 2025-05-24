import express from "express";
import {
  getAllDeals,
  getDealById,
  addDeal,
  updateDeal,
  deleteDeal,
} from "../controllers/dealController.js";

const router = express.Router();

router.get("/getall", getAllDeals);
router.get("/:id", getDealById);
router.post("/add", addDeal);
router.put("/:id", updateDeal);
router.delete("/:id", deleteDeal);

export default router;
