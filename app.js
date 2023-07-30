const express = require("express");
require("dotenv").config();
const { connectToDatabase } = require("./database/db");
const bookingRoutes = require("./routes/bookingRoutes");
const authRoutes = require("./routes/authRoutes");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Cab Booking Service API is running!");
});

connectToDatabase()
  .then(() => {
    app.use("/bookings", bookingRoutes);
    app.use("/auth", authRoutes);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error starting the server", error);
  });
