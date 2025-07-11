import mongoose from "mongoose";

const transportRecordSchema = new mongoose.Schema({
  serialNumber: { type: String, required: true },
  dateOfLoading: { type: Date, required: true },
  advancePayment: { type: Number, required: true },
  station: { type: String, required: true },
  loadedWeight: { type: Number, required: true },
  emptyWeight: { type: Number, required: true },
  dateOfUnloading: { type: Date, required: true },
  amount: { type: Number, required: true },
  shortage: { type: Number, required: true },
  tds: { type: Number, required: true },
  extraDayCharges: { type: Number, required: true },
  netAmount: { type: Number, required: true },
  driverContact: { type: String, required: true },
  companyContact: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
});

export default mongoose.model("TransportRecord", transportRecordSchema);
