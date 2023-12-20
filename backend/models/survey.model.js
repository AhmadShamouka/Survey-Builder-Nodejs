const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    questions: [
      {
        id: {
          type: String,
          required: true,
        },
        questionName: {
          type: String,
          required: true,
          trim: true,
        },
        questionType: {
          type: String,
          required: true,
        },
        answers: [
          {
            answerText: {
              type: String,
              required: true,
            },
            answerType: {
              type: Boolean,
              default: false,
            },
          },
        ],
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Survey = mongoose.model("Survey", surveySchema);

module.exports = Survey;
