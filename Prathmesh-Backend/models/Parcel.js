import mongoose from "mongoose";

const parcelSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  location: { type: String, required: true },
  vanAvailable: { type: Boolean, default: false },
  deliveryDays: { type: Number, required: true },
  actualAmount: { type: Number, required: true },
  totalAmount: { type: Number }, // Admin-only field
  delayCharges: { type: Number }, // Admin can insert if delayed
  isDelayed: { type: Boolean, default: false },
  status: { type: String, default: "pending" },
});

export default mongoose.model("Parcel", parcelSchema);
