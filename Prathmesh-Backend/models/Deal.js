import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

const dealSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true }, // Auto-incremented ID
    vanId: { type: String, required: true },
    ownerId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

// Apply auto-increment plugin
dealSchema.plugin(AutoIncrement, { inc_field: "id", id: "deal_seq" });

export default mongoose.model("Deal", dealSchema);
