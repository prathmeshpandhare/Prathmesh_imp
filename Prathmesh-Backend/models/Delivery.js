import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

const Delivery = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dealId: { type: mongoose.Schema.Types.ObjectId, ref: "Deal" },
  status: { type: String, enum: ["delivered", "delayed"], required: true },
  deliveryDate: Date,
  remarks: String,
});

// Apply auto-increment plugin
Delivery.plugin(AutoIncrement, { inc_field: "id", id: "delivery_seq" });

const delivery = mongoose.model("delivery", Delivery);
export default delivery;
