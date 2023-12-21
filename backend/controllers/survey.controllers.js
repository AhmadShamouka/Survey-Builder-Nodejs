const Survey = require("../models/survey.model");
const User = require("../models/user.model");

const addSurvey = async (req, res) => {
  const { title, questions } = req.body;

  try {
    const survey = await Survey.create({
      title,
      questions,
      userId: req.user._id,
    });
    return res.status(200).send({ survey });
  } catch (error) {
    return res.status(500).send(error);
  }
};
const getSurvey = async (req, res) => {
  try {
    const surveyData = await Survey.find();

    return res.status(200).send({ surveyData });
  } catch (error) {
    console.error("Error fetching survey:", error);
    return res.status(500).send(error);
  }
};
module.exports = {
  addSurvey,
  getSurvey,
};
