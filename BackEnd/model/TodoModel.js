const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: {
    type: String,
  },
  todo: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Todo", todoSchema);
