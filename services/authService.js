const accountSid = "AC3191755bc7c0bc016090c9108ed3f3df";
const authToken = "ac7cfdfdb538bec206e9e4ada83af178";
const verifySid = "VAe03aee89be1c137fc9f32a5e8a0f9e29";
const client = require("twilio")(accountSid, authToken);

async function sendOTP(phoneNumber) {
  try {
    console.log(phoneNumber);
    const verification = await client.verify.v2
      .services(verifySid)
      .verifications.create({ to: phoneNumber, channel: "sms" });

    return verification.status;
  } catch (error) {
    console.error("Error sending OTP:", error); // Log the error
    throw new Error("Failed to send OTP");
  }
}

async function verifyOTP(phoneNumber, otpCode) {
  try {
    const verification_check = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: phoneNumber, code: otpCode });

    return verification_check.status;
  } catch (error) {
    console.error("Error verifying OTP:", error); // Log the error
    throw new Error("Failed to verify OTP");
  }
}

module.exports = {
  sendOTP,
  verifyOTP,
};
