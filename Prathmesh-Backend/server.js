import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import ownersRoutes from "./routes/owners.js";
import dealsRoutes from "./routes/deals.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import vanRoutes from "./routes/vanRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardroutes from "./routes/dashboardRoutes.js";
dotenv.config();
const app = express();
app.use(express.json());

import cors from "cors";

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    // You can add other options if needed
  })
);

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to the Van Rental API");
});
// Your routes
app.use("/api/owners", ownersRoutes);
app.use("/api/deals", dealsRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/vans", vanRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardroutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => console.log("Server running"));
  })
  .catch((err) => console.error(err));
