import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// Import routes
import ownersRoutes from "../routes/owners.js";
import dealsRoutes from "../routes/deals.js";
import paymentRoutes from "../routes/paymentRoutes.js";
import vanRoutes from "../routes/vanRoutes.js";
import authRoutes from "../routes/authRoutes.js";
import dashboardroutes from "../routes/dashboardRoutes.js";

// Configure dotenv
dotenv.config();

const app = express();

// CORS - Allow frontend origin
app.use(
  cors({
    origin: ["http://localhost:5173", "https://prathmesh-imp-6kkx.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());

// Root test route
app.get("/", (req, res) => {
  res.send({ activestaus: "active", message: "Welcome to the Van Rental API" });
});

// Mount all API routes
app.use("/api/owners", ownersRoutes);
app.use("/api/deals", dealsRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/vans", vanRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardroutes);

// Ensure Mongoose connection is established once per cold start
let isConnected = false;
async function connectDB() {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB connected");
  }
}

// Export serverless handler
export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}
