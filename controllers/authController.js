const authService = require("../services/authService");

async function sendOTP(req, res) {
  try {
    console.log(req.body);
    const { phoneNumber } = req.body;
    const status = await authService.sendOTP(phoneNumber);
    res.json({ status });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to send OTP", error: error.message });
  }
}

async function verifyOTP(req, res) {
  try {
    const { phoneNumber, otpCode } = req.body;
    const status = await authService.verifyOTP(phoneNumber, otpCode);
    res.json({ status });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to verify OTP", error: error.message });
  }
}

module.exports = {
  sendOTP,
  verifyOTP,
};
