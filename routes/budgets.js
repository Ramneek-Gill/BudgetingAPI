const express = require("express");
const router = express.Router();
const { Budget, validate } = require("../models/budget");

router.get("/", async (req, res) => {
  const budgets = await Budget.find();
  res.send(budgets);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const budget = new Budget({
    budget: req.body.budget
  });
  await budget.save();

  res.send(budget);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const budget = await Budget.findByIdAndUpdate(
    req.params.id,
    {
      budget: req.body.budget
    },
    { new: true }
  );

  if (!budget) {
    return res.status(404).send("The budget with the given ID was not found.");
  }

  res.send(budget);
});

router.get("/:id", async (req, res) => {
  const budget = await Budget.findById(req.params.id);

  if (!budget)
    return res.status(404).send("The budget with the given ID was not found.");

  res.send(budget);
});

module.exports = router;
