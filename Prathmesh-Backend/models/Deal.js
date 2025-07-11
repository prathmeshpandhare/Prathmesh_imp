import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

const dealSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true }, // Auto-incremented ID
    vanId: { type: String, required: true },
    ownerId: { type: String, required: true },
    amount: { type: Number, required: true },

    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    vanRequired: Boolean,
    deliveryDays: Number,
    extendedDays: Number,
    chargesForExtension: Number,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
    },
    assignedVanId: { type: mongoose.Schema.Types.ObjectId, ref: "Van" },
  },
  { timestamps: true }
);

// Apply auto-increment plugin
dealSchema.plugin(AutoIncrement, { inc_field: "id", id: "deal_seq" });

export default mongoose.model("Deal", dealSchema);
