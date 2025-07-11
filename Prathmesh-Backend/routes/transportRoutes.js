import express from "express";
import {
  createTransportRecord,
  getAllTransportRecords,
  getTransportRecordById,
  updateTransportRecord,
  deleteTransportRecord,
  filterTransportByDate,
} from "../controllers/transportController.js";

const router = express.Router();

router.post("/transport-record", createTransportRecord);
router.get("/transport-records", getAllTransportRecords);
router.get("/transport-record/:id", getTransportRecordById);
router.put("/transport-record/:id", updateTransportRecord);
router.delete("/transport-record/:id", deleteTransportRecord);
router.get("/transport-records/filter", filterTransportByDate);

export default router;
