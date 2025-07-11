import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  contact: String,
  email: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Company", companySchema);
