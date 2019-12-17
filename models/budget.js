const Joi = require("joi");
const mongoose = require("mongoose");
const { categorySchema } = require("./category");

const Budget = mongoose.model(
  "Budget",
  new mongoose.Schema({
    budget: {
      type: Number,
      required: true,
      max: 9999
    },
    category: {
      type: categorySchema,
      required: true
    }
  })
);

function validateBudget(budget) {
  const schema = {
    budget: Joi.number().required(),
    categoryId: Joi.string().required()
  };
  return Joi.validate(budget, schema);
}

module.exports.Budget = Budget;
module.exports.validate = validateBudget;
