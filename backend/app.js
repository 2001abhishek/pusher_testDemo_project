const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const meetRoutes = require("./routes/meetRoutes");
const doctorRoutes = require("./routes/doctors");
const userRoutes = require("./routes/userRoutes");


require("dotenv").config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes); // Mounting auth routes
app.use("/meet", meetRoutes);
app.use("/doctors", doctorRoutes);




// Routes
app.use("/auth", authRoutes); // Use this base path consistently
app.use("/api/meet", meetRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/users", userRoutes); // Mounting user routes



module.exports = app;
