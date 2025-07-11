import TransportRecord from "../models/TransportRecord.js";

// Create
export const createTransportRecord = async (req, res) => {
  try {
    const newRecord = new TransportRecord(req.body);
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Read all
export const getAllTransportRecords = async (req, res) => {
  try {
    const records = await TransportRecord.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Read one
export const getTransportRecordById = async (req, res) => {
  try {
    const record = await TransportRecord.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
export const updateTransportRecord = async (req, res) => {
  try {
    const updatedRecord = await TransportRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRecord)
      return res.status(404).json({ message: "Record not found" });
    res.json(updatedRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete
export const deleteTransportRecord = async (req, res) => {
  try {
    await TransportRecord.findByIdAndDelete(req.params.id);
    res.json({ message: "Transport record deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Filter by Date Range
export const filterTransportByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const records = await TransportRecord.find({
      dateOfLoading: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    }).sort({ dateOfLoading: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
