import Auth from "../models/Auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password, contact, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Auth({
      name,
      email,
      password: hashedPassword,
      contact,
      role,
    });
    await user.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Signup error", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Auth.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(403).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({ token, role: user.role, name: user.name, id: user._id });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};
