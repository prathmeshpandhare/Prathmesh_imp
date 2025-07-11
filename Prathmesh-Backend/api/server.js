import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// Routes
import ownersRoutes from "../routes/owners.js";
import dealsRoutes from "../routes/deals.js";
import paymentRoutes from "../routes/paymentRoutes.js";
import vanRoutes from "../routes/vanRoutes.js";
import authRoutes from "../routes/authRoutes.js";
import dashboardroutes from "../routes/dashboardRoutes.js";
import parcelRoutes from "../routes/parcelRoutes.js";
import notificationRoutes from "../routes/notificationRoutes.js";
import transportRoutes from "../routes/transportRoutes.js";
import driverRoutes from "../routes/driverRoutes.js";
import companyRoutes from "../routes/companyRoutes.js";
// Config
dotenv.config();
const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
      "https://prathmesh-imp-6kkx.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send({ status: "active", message: "Welcome to the Van Rental API" });
});
app.use("/api/owners", ownersRoutes);
app.use("/api/deals", dealsRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/vans", vanRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardroutes);
app.use("/api/parcels", parcelRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/transport", transportRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/companies", companyRoutes);
// MongoDB connection
let isConnected = false;
async function connectDB() {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB connected");
  }
}

// --- For Local Dev ---
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running locally at http://localhost:${PORT}`);
    });
  });
}

// --- For Serverless Deployment ---
export default async function handler(req, res) {
  await connectDB();
  return app(req, res); // Adapts Express app to serverless platforms
}
