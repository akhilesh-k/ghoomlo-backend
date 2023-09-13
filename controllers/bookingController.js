const bookingService = require("../services/bookingService");

function createWhatsAppMessage(req) {
  console.log("Creating WhatsApp message", req.body);
  const { sourceName, destinationName, requestedTime, vehicleName } = req.body;

  // Convert requestedTime to Indian time
  const indianTime = new Date(requestedTime).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });

  const phone = 916200944189;
  // Encode the message using encodeURIComponent
  const message = `https://api.whatsapp.com/send?phone=${encodeURIComponent(
    phone
  )}&text=Hi,%0AI want to book a cab, here are the details:%0A*Vehicle Type:* ${encodeURIComponent(
    vehicleName
  )}%0A*Pickup:* ${encodeURIComponent(
    sourceName
  )}%0A*Drop:* ${encodeURIComponent(
    destinationName
  )}%0A*Date:* ${encodeURIComponent(indianTime)}`;

  return message;
}

async function createBooking(req, res) {
  try {
    const {
      sourceName,
      sourceLatLong,
      destinationName,
      destinationLatLong,
      customerId,
      visitorId,
      customerName,
      requestedTime,
      phoneNumber,
      visitTime,
      vehicleName,
    } = req.body;

    const newBooking = await bookingService.requestBooking({
      sourceName,
      sourceLatLong,
      destinationName,
      destinationLatLong,
      customerId,
      visitorId,
      customerName,
      requestedTime,
      phoneNumber,
      visitTime,
      vehicleName,
    });

    res.status(201).json({
      success: true,
      data: {
        bookingDetails: newBooking,
        followupMessage: createWhatsAppMessage(req),
      },
    });
  } catch (error) {
    console.error("Error saving record to the DB: ", error);
    res
      .status(500)
      .json({ message: "Failed to create booking", error: error.message });
  }
}

async function getAllBookings(req, res) {
  try {
    const bookings = await bookingService.getAllBookings();
    res.json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch bookings", error: error.message });
  }
}

async function findPlaces(req, res) {
  try {
    const { searchTerm, lat, long } = req.query;
    const places = await bookingService.findPlaces(searchTerm, lat, long);
    res.json(places);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch places", error: error.message });
  }
}

module.exports = {
  createBooking,
  getAllBookings,
  findPlaces,
};
