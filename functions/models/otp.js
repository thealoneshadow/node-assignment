const mongoose = require('mongoose');
const validator = require("validator");
const userOTPSchema = new mongoose.Schema({
    userId: String,
    otp: Number,
    expiry: Date,
},{timestamps: true});

 //update hook
 userOTPSchema.pre("updateOne", function (next) {
    const updates = this.getUpdate();
    // Validating the request for empty body
    if (Object.keys(updates.req).length === 0) {
      return next(new Error("Request Body is Empty"));
    }
  
    // Validating the request for missing fields
    if (
      updates.req.id == undefined ||
      updates.req.otp == undefined 
    ) {
      return next(new Error("Fields Missing Expected:{id,otp}"));
    }
  
    // Validating the request for allowed fields
    const allowedFields = ["id", "otp"];
    const extraFields = Object.keys(updates.req).filter(
      (field) => !allowedFields.includes(field)
    );
    if (extraFields.length > 0) {
      return next(new Error(`Invalid field(s): ${extraFields.join(", ")}`));
    }
  
    next();
  });


module.exports = mongoose.model("UserOTPVerification", userOTPSchema);