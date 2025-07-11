import Parcel from "../models/Parcel.js";
import Notification from "../models/Notification.js";

export const createParcel = async (req, res) => {
  try {
    const parcel = new Parcel(req.body);
    await parcel.save();

    // Notify company
    await Notification.create({
      userId: parcel.companyId,
      userType: "Company",
      message: "New parcel created.",
    });

    res.status(201).json(parcel);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Parcel creation failed", error: err.message });
  }
};

export const updateParcelStatus = async (req, res) => {
  try {
    const parcel = await Parcel.findByIdAndUpdate(
      req.params.parcelId,
      req.body,
      { new: true }
    );

    if (!parcel) return res.status(404).json({ message: "Parcel not found" });

    // Notify parties if parcel is delivered
    if (req.body.status === "delivered") {
      const message = "Parcel has been delivered.";

      await Notification.insertMany([
        { userId: parcel.companyId, userType: "Company", message },
        { userId: req.body.ownerId, userType: "Owner", message },
        { userId: req.body.adminId, userType: "Admin", message },
      ]);
    }

    res.status(200).json(parcel);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

export const getParcelsByCompany = async (req, res) => {
  try {
    const parcels = await Parcel.find({ companyId: req.params.companyId });
    res.status(200).json(parcels);
  } catch (err) {
    res.status(500).json({ message: "Fetching failed", error: err.message });
  }
};
