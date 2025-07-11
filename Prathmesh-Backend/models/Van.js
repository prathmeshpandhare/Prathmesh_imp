import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";
import Auth from "./Auth.js"; // Assuming Auth model is in the same directory
const AutoIncrement = mongooseSequence(mongoose);

const vanSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true }, // Auto-incremented ID
    vanNumber: { type: String, required: true },
    bookedDays: { type: Number, required: true },
    actualAmount: { type: Number, required: true }, // new field
    totalAmount: { type: Number, required: true }, // new field
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["available", "in-use", "unavailable"],
      default: "available",
    },
    assignedCompanyId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional
  },
  { timestamps: true }
);

// Apply auto-increment plugin
vanSchema.plugin(AutoIncrement, { inc_field: "id", id: "van_seq" });

export default mongoose.model("Van", vanSchema);
