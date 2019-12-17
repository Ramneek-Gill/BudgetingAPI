const categories = require("../routes/categories");
const users = require("../routes/users");
const transactions = require("../routes/transactions");
const budgets = require("../routes/budgets");
const auth = require("../routes/auth");
const error = require("../middleware/error");
const express = require("express");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/categories", categories);
  app.use("/api/transactions", transactions);
  app.use("/api/budgets", budgets);
  app.use("/api/users", users);
  app.use("/api/auth", auth);

  app.use(error);
};
