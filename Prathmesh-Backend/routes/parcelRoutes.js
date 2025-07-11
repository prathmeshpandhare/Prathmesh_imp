import express from "express";
import {
  createParcel,
  updateParcelStatus,
  getParcelsByCompany,
} from "../controllers/parcelController.js";

const router = express.Router();

router.post("/create", createParcel);
router.put("/update/:parcelId", updateParcelStatus);
router.get("/company/:companyId", getParcelsByCompany);

export default router;
