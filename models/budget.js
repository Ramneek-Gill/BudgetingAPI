const Joi = require("joi");
const mongoose = require("mongoose");

const Budget = mongoose.model(
  "Budget",
  new mongoose.Schema({
    budget: {
      type: Number,
      required: true,
      max: 9999
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255
    }
  })
);

function validateBudget(budget) {
  const schema = {
    budget: Joi.number().required(),
    name: Joi.string()
      .max(50)
      .required()
  };
  return Joi.validate(budget, schema);
}

module.exports.Budget = Budget;
module.exports.validate = validateBudget;
