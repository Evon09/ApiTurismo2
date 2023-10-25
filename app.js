const createError = require("http-errors");
const express = require("express");
const path = require("path");
var logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config(); //Variaveis de ambiente

const MONGO_URL = process.env.MONGO_URL;

//mongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log(`Banco conectado -> ${MONGO_URL} `);
  })
  .catch((err) => {
    console.log("Deu ruim ao conectar com o banco de dados \n");
    console.log(err);
  });

var indexRouter = require("./routes/index");
var feedbackRouter = require("./routes/feedback");
var livrosRouter = require("./routes/livro");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/feedback", feedbackRouter);
app.use("/livros", livrosRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
