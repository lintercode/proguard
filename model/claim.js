const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const claimSchema = new Schema({
  title: { type: String, required: true }
});

const Claim = mongoose.model("Claim", claimSchema);

module.exports = Claim;
