const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    skills: [
      {
        type: String,
      },
    ],

    score: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const resumeModel = mongoose.model("Resume", resumeSchema);

module.exports = resumeModel;