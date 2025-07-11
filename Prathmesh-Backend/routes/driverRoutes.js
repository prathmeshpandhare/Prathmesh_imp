import express from "express";
import {
  getAllDrivers,
  addDriver,
  updateDriver,
  deleteDriver,
  getDriverById,
} from "../controllers/driverController.js";

const router = express.Router();

router.get("/getall", getAllDrivers);
router.get("/:id", getDriverById);
router.post("/add", addDriver);
router.put("/:id", updateDriver);
router.delete("/:id", deleteDriver);

export default router;
