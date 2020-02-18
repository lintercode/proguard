const mongoose = require("mongoose");
require("./claim")

const Schema = mongoose.Schema;

const roleSchema = new Schema({
  title: { type: String, required: true },
  privilage: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Claim", default: null }
  ]
});

const Role = mongoose.model("Role", roleSchema)

module.exports = Role;