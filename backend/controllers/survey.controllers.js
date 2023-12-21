const Survey = require("../models/survey.model");
const User = require("../models/user.model");

const addSurvey = async (req, res) => {
  const { title, questions } = req.body;
  try {
    if (req.user.role_id === 1) {
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
    } else {
      return res.status(500).send({ error: "You dont have Permission" });
    }
  } catch {
    return res.status(500).send({ error: "Check all Inputs" });
  }
};

const getSurvey = async (req, res) => {
  try {
    if (req.user.role_id === 1) {
      try {
        const surveyData = await Survey.find();
        return res.status(200).send({ surveyData });
      } catch (error) {
        console.error("Error fetching survey:", error);
        return res.status(500).send(error);
      }
    } else {
      return res.status(500).send({ error: "You dont have Permission" });
    }
  } catch {
    return res.status(500).send({ error: "Check all Inputs" });
  }
};

const getOneSurvey = async (req, res) => {
  const surveyId = req.body.surveyId;
  console.log(`Fetching survey with ID: ${surveyId}`);

  try {
    const surveyData = await Survey.findOne({ _id: surveyId });

    if (!surveyData) {
      return res.status(404).send({ error: "Survey not found" });
    }

    return res.status(200).send({ surveyData });
  } catch (error) {
    console.error("Error fetching survey:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = {
  addSurvey,
  getSurvey,
  getOneSurvey,
};
