const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: Date,
  updatedAt: Date,
});

const Category = mongoose.model("Category", categorySchema);

module.exports = {
  Category,
};