const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },

    title: {
      type: String,
      required: true
    },

    fileUrl: {
      type: String,
      required: true
    },

    skills: [{
      type: String
    }],

    score: {
      type: Number,
      default: 0
    },

    analysis: {
      atsScore: Number,
      resumeSummary: String,
      strengths: [String],
      weaknesses: [String],
      missingSkills: [String],
      recommendedRoles: [String],

      keywordAnalysis: {
        present: [String],
        missing: [String]
      },

      suggestions: [String]
    }
  },
  {
    timestamps: true
  }
);

const resumeModel = mongoose.model("Resume", resumeSchema);

module.exports = resumeModel;