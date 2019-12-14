const Joi = require("joi");
const mongoose = require("mongoose");
const { categorySchema } = require("./category");

const Transaction = mongoose.model(
  "Transaction",
  new mongoose.Schema({
    item: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255
    },
    category: {
      type: categorySchema,
      required: true
    },
    cost: {
      type: Number,
      required: true,
      min: 0,
      max: 255
    }
  })
);

function validateTransaction(transaction) {
  const schema = {
    item: Joi.string()
      .min(5)
      .max(50)
      .required(),
    categoryId: Joi.string().required(),
    cost: Joi.number()
      .min(0)
      .required()
  };
  return Joi.validate(transaction, schema);
}

module.exports.Transaction = Transaction;
module.exports.validate = validateTransaction;
