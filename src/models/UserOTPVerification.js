const mongoose = require('mongoose');

const userOTPSchema = new mongoose.Schema({
    userId: String,
    otp: String,
},{timestamps: true});


module.exports = mongoose.model("UserOTPVerification", userOTPSchema);