const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middelware");
const { addSurvey, getSurvey } = require("../controllers/survey.controllers");
const router = express.Router();

router.post("/new", authMiddleware, addSurvey);
router.get("/getSurvey", getSurvey);
module.exports = router;
