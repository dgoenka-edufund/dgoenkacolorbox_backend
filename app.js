const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");

const logger = require("morgan");

const usersRouter = require("./routes/users");
const recipesRouter = require("./routes/recipes");

const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env.MONGO_URL);
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    console.log("mongoose error: " + err);
  }
);

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/users", usersRouter);
app.use("/recipes", recipesRouter);

module.exports = app;
