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
      maxlength: 255
    },
    category: {
      type: categorySchema,
      required: true
    },
    cost: {
      type: Number,
      required: true,
      max: 9999
    }
  })
);

function validateTransaction(transaction) {
  const schema = {
    item: Joi.string()
      .max(50)
      .required(),
    categoryId: Joi.string().required(),
    cost: Joi.number().required()
  };
  return Joi.validate(transaction, schema);
}

module.exports.Transaction = Transaction;
module.exports.validate = validateTransaction;
