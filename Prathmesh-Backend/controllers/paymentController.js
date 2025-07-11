import Payment from "../models/Payment.js";

export const getPayments = async (req, res) => {
  try {
    const { ownerId, companyId } = req.query;

    const filter = {};
    if (ownerId) filter.ownerId = ownerId;
    if (companyId) filter.companyId = companyId;

    const payments = await Payment.find(filter);
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments" });
  }
};

export const addPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ message: "Error adding payment" });
  }
};

export const updatePayment = async (req, res) => {
  try {
    const updated = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Payment not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error updating payment" });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const deleted = await Payment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Payment not found" });
    res.json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting payment" });
  }
};
