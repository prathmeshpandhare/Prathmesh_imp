// controllers/ownerController.js
import Owner from "../models/Owner.js";
import Van from "../models/Van.js";

export const getOwnerStats = async (req, res) => {
  try {
    const { ownerId } = req.params;

    const totalVans = await Van.countDocuments();
    const available = await Van.countDocuments({
      ownerId,
      status: "Available",
    });
    const booked = await Van.countDocuments({ ownerId, status: "Booked" });

    res.status(200).json({ totalVans, available, booked });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch owner stats" });
  }
};
export const getAllOwners = async (req, res) => {
  try {
    const owners = await Owner.find();
    res.json(owners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOwnerById = async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (!owner) return res.status(404).json({ message: "Owner not found" });
    res.json(owner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addOwner = async (req, res) => {
  const { name, contact, city, vansAvailable, vanNumbers } = req.body;

  // Validate required fields
  if (!name || !contact || !city || vansAvailable === undefined) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Validate vanNumbers
  if (
    !Array.isArray(vanNumbers) ||
    vanNumbers.length === 0 ||
    vanNumbers.some((num) => typeof num !== "string" || num.trim() === "")
  ) {
    return res
      .status(400)
      .json({ message: "At least one valid van number is required" });
  }

  const newOwner = new Owner({
    name,
    contact,
    city,
    vansAvailable,
    vanNumbers,
  });

  try {
    await newOwner.save();
    res.status(201).json(newOwner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateOwner = async (req, res) => {
  try {
    const updatedOwner = await Owner.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedOwner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    res.json(updatedOwner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteOwner = async (req, res) => {
  try {
    const result = await Owner.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Owner not found" });
    }
    res.json({ message: "Owner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
