import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

const ownerSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // Use Number for auto-incremented ID
  name: { type: String, required: true },
  contact: { type: String, required: true },
  city: { type: String, required: true },
  vansAvailable: { type: Number, required: true },
  vanNumbers: [{ type: String, required: true }],
  email: String,
  password: String,
});

ownerSchema.plugin(AutoIncrement, { inc_field: "id", id: "owner_seq" });

export default mongoose.model("Owner", ownerSchema);
