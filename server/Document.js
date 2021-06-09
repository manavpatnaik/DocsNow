const mongoose = require("mongoose");

const DocSchema = new mongoose.Schema({
  _id: String,
  data: Object,
});

const Document = mongoose.model("Document", DocSchema);

module.exports = Document;
