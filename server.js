const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const emailRoutes = require("./routes/emailRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("public/uploads"));

// Routes
app.use("/api", emailRoutes);

// Connect to DB and start server
connectDB();
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
