const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    status: {
      type: String,
      enum: ["pending", "in-progress", "done"],
      default: "pending",
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    dueDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
