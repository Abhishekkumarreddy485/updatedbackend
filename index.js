const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require("./config/db"); // Adjust path if your `db.js` file is in another location
const emailRoutes = require("./routes/emailRoutes"); // Ensure this path matches your emailRoutes file

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "public/uploads"))); // Serve static files from the uploads folder

// API Routes
app.use("/api", emailRoutes);

// Handle non-existent routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Resource not found" });
});

// Error handling middleware (optional, for better debugging)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Connect to the database and start the server
const PORT = process.env.PORT || 5000; // Use environment variable for port or default to 5000
connectDB(); // Ensure your database connection is properly configured in `db.js`

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
