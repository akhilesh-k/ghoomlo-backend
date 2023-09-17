const mongoose = require("mongoose");

const supportRequestSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  requestType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SupportRequest = mongoose.model("SupportRequest", supportRequestSchema);

module.exports = SupportRequest;
