import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

const vanSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true }, // Auto-incremented ID
    vanNumber: { type: String, required: true },
    bookedDays: { type: Number, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

// Apply auto-increment plugin
vanSchema.plugin(AutoIncrement, { inc_field: "id", id: "van_seq" });

export default mongoose.model("Van", vanSchema);
