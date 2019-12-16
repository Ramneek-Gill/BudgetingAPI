const express = require("express");
const router = express.Router();
const { Category } = require("../models/category");
const { Transaction, validate } = require("../models/transaction");

router.get("/", async (req, res) => {
  const transactions = await Transaction.find().sort("name");
  res.send(transactions);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid Category");

  const transaction = new Transaction({
    item: req.body.item,
    category: {
      _id: category._id,
      name: category.name
    },
    cost: req.body.cost
  });
  await transaction.save();

  res.send(transaction);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid Category.");

  const transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    {
      item: req.body.item,
      category: {
        _id: category._id,
        name: category.name
      },
      cost: req.body.cost
    },
    { new: true }
  );

  if (!transaction) {
    return res
      .status(404)
      .send("The transaction with the given ID was not found.");
  }

  res.send(transaction);
});

router.delete("/:id", auth, async (req, res) => {
  const transaction = await Transaction.findByIdAndRemove(req.params.id);

  if (!transaction)
    return res
      .status(404)
      .send("The transaction with the given ID was not found.");

  res.send(transaction);
});

router.get("/:id", async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction)
    return res
      .status(404)
      .send("The transaction with the given ID was not found.");

  res.send(transaction);
});

module.exports = router;
