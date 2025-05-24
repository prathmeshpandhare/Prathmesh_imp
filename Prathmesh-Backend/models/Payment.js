import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

const paymentSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // Auto-incremented numeric ID
  ownerName: { type: String, required: true },
  vanNumber: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
});

// Apply auto-increment plugin
paymentSchema.plugin(AutoIncrement, { inc_field: "id", id: "payment_seq" });

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
