const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Optional DevOps environment variables
const BUILD_NUMBER = process.env.BUILD_NUMBER || "local";
const NODE_ENV = process.env.NODE_ENV || "development";

// Serve STATIC files inside /views folder (CSS, images, etc.)
app.use(express.static(path.join(__dirname, "views")));

// Serve index.html from /views
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Optional API endpoint
app.get("/info", (req, res) => {
  res.json({
    message: "DevOps CI/CD Pipeline Demo",
    buildNumber: BUILD_NUMBER,
    environment: NODE_ENV,
    port: PORT,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log("App is running inside container on port " + PORT);
});
