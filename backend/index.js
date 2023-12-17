const express = require("express");
// const { db } = require("./configs/db.configs");

const { connectToMongoDB } = require("./configs/mongoDb.config");

const app = express();
app.use(express.json());
require("dotenv").config();

app.get("/hello", (req, res) => {
  console.log("hello!!!");
});

// auth route
// const authRoutes = require("./routes/auth.routes");
// app.use("/auth", authRoutes);
// to do routes
// const todoRoutes = require("./routes/todo.routes");

// app.use("/survey", todoRoutes);

app.listen(8000, () => {
  console.log("listening");
  connectToMongoDB();
});
