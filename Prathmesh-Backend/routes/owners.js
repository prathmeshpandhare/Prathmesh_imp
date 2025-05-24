import express from "express";
import {
  getAllOwners,
  addOwner,
  updateOwner,
  deleteOwner,
  getOwnerById,
  getOwnerStats,
} from "../controllers/ownerController.js";

const router = express.Router();

router.get("/getall", getAllOwners);
router.get("/:id", getOwnerById);
router.post("/add", addOwner);
router.put("/:id", updateOwner);
router.delete("/:id", deleteOwner);
router.get("/stats/:ownerId", getOwnerStats);

export default router; // ✅ ES module export
