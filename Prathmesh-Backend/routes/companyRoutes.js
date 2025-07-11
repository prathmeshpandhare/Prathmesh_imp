import express from "express";
import {
  getAllCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
  getCompanyById,
} from "../controllers/companyController.js";

const router = express.Router();

router.get("/getall", getAllCompanies);
router.get("/:id", getCompanyById);
router.post("/add", addCompany);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);

export default router;
