const express = require("express");
const cors = require("cors");
const { connectToMongoDB } = require("./configs/mongoDb.config");

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);
const surveyRoutes = require("./routes/survey.routes");
app.use("/survey", surveyRoutes);
require("dotenv").config();

app.get("/hello", (req, res) => {
  console.log("hello!!!");
});

app.listen(8000, () => {
  console.log("listening");
  connectToMongoDB();
});
