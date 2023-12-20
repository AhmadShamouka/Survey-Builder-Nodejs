const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middelware");
const { addSurvey } = require("../controllers/survey.controllers");
const router = express.Router();

router.post("/new", addSurvey);

module.exports = router;
