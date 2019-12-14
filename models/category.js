const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50
  }
});

const Category = mongoose.model("Category", categorySchema);

function validateCategory(category) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(category, schema);
}

module.exports.Category = Category;
module.exports.validate = validateCategory;
module.exports.categorySchema = categorySchema;
