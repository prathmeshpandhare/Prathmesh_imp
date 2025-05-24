import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "owner"], required: true },
  contact: { type: String, required: true },
});

export default mongoose.model("Auth", authSchema);
