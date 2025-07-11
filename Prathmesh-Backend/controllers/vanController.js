import Van from "../models/Van.js";
import Owner from "../models/Owner.js";
export const getAllVans = async (req, res) => {
  try {
    const vans = await Van.find();
    res.json(vans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const addVan = async (req, res) => {
  try {
    const { vanNumber, bookedDays, amount, actualAmount, totalAmount } =
      req.body;

    const newVan = new Van({
      vanNumber: String(vanNumber),
      bookedDays,
      amount,
      actualAmount,
      totalAmount,
    });

    await newVan.save();
    res.status(201).json(newVan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getVansByOwnerId = async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.ownerId);
    console.log("Fetched Owner Van Numbers:", owner.vanNumbers);

    // Normalize input for debugging
    const normalized = owner.vanNumbers.map(String);
    console.log("Normalized Van Numbers:", normalized);

    // Fetch matching vans
    const vans = await Van.find({ vanNumber: { $in: normalized } });
    console.log("Matched Vans:", vans);

    res.json(vans);
  } catch (err) {
    console.error("Error fetching vans by owner:", err);
    res.status(500).json({ error: err.message });
  }
};

export const updateVan = async (req, res) => {
  try {
    const updatedVan = await Van.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedVan) return res.status(404).json({ message: "Van not found" });
    res.json(updatedVan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteVan = async (req, res) => {
  try {
    const result = await Van.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Van not found" });
    res.json({ message: "Van deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
