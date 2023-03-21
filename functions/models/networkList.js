const mongoose = require("mongoose");
const networkListSchema = new mongoose.Schema(
  {
    networkLogoURL: {
      type: String,
      required: true,
      trim: true,
    },
    networkName: {
      type: String,
      required: true,
      trim: true,
    },
    networkVerifiedStatus: {
      type: Boolean,
      required: true,
    },
  }
);


module.exports = mongoose.model("networkList", networkListSchema);
