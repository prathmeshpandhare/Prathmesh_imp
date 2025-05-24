import Deal from "../models/Deal.js";
import Van from "../models/Van.js";
import Owner from "../models/Owner.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalDeals = await Deal.countDocuments();
    const registeredVans = await Van.countDocuments();
    const vanOwners = await Owner.countDocuments();
    const isBooked = await Van.countDocuments({ isBooked: true });
    const isAvailable = await Van.countDocuments({ isBooked: false });

    res.status(200).json({
      totalDeals,
      registeredVans,
      vanOwners,
      isBooked,
      isAvailable,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};
