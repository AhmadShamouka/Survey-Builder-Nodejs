const Survey = require("../models/survey.model");
const User = require("../models/user.model");

const addSurvey = async (req, res) => {
  const { title, questions } = req.body;
  if (req.user.role_id === 2) {
    try {
      const survey = await Survey.create({
        title,
        questions,
        userId: req.user._id,
      });
      res.status(200).send({ survey });
    } catch (error) {
      res.status(500).send({ error });
    }
  } else {
    res.status(403).send("You don't have the role to add a survey");
  }
};

module.exports = {
  addSurvey,
};
