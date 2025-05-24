import Deal from "../models/Deal.js";

export const getAllDeals = async (req, res) => {
  try {
    const deals = await Deal.find();
    res.json(deals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDealById = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);
    if (!deal) return res.status(404).json({ message: "Deal not found" });
    res.json(deal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addDeal = async (req, res) => {
  try {
    const newDeal = new Deal(req.body);
    await newDeal.save();
    res.status(201).json(newDeal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateDeal = async (req, res) => {
  try {
    const updatedDeal = await Deal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedDeal)
      return res.status(404).json({ message: "Deal not found" });
    res.json(updatedDeal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteDeal = async (req, res) => {
  try {
    const result = await Deal.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Deal not found" });
    res.json({ message: "Deal deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
