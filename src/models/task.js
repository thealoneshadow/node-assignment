const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["Completed", "Incomplete"],
    default: "Incomplete",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  position: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
