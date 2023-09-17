const express = require("express");
require("dotenv").config();
const { connectToDatabase } = require("./database/db");
const { swaggerUi, specs } = require("./swaggerConfig");
const bookingRoutes = require("./routes/bookingRoutes");
const authRoutes = require("./routes/authRoutes");
const fleetRoutes = require("./routes/fleetRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    customCss: ".swagger-ui .topbar { background-color: #333;}", // Optional custom CSS
    customSiteTitle: "Ghoomlo Backend API docs",
    swaggerOptions: {
      // Additional Swagger UI options
    },
    // Add other Swagger UI configuration options here
  })
);
app.get("/", (req, res) => {
  res.send("Ghoomlo Backend API is running!");
});

connectToDatabase()
  .then(() => {
    app.use("/bookings", bookingRoutes);
    app.use("/auth", authRoutes);
    app.use("/fleet", fleetRoutes);
    app.use("/feedback", feedbackRoutes);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error starting the server", error);
  });
