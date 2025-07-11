import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  contact: String,
  licenseNumber: String,
  assignedCompany: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Driver", driverSchema);
