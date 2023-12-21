const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middelware");
const {
  addSurvey,
  getSurvey,
  getOneSurvey,
} = require("../controllers/survey.controllers");
const router = express.Router();

router.post("/new", authMiddleware, addSurvey);
router.get("/getSurvey", authMiddleware, getSurvey);
router.post("/getOneSurvey", authMiddleware, getOneSurvey);
module.exports = router;
