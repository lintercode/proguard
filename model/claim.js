const mongoose = require('mongoose')
const Schema = mongoose.Schema

const claimSchema = new Schema({
  title: { type: String, required: true }
})

module.exports = claimSchema
