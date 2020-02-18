const express = require("express");
const bodyparser = require("body-parser");

const app = express();

//Middlewares for user requests
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//middleware for handling file not found error
app.use((req, res, next) => {
  const err = new Error("Request not found");
  res.status(404).json({ error: err });
  next(err);
});

//middleware for handling all errors
app.use((err, req, res, next) => {
  const error = (app.get("env") = "development" ? err : {});
  const status = err.status || 500;
  res.status(status).json({ error:{message: error.message} });
});
