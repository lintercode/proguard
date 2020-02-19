const mongoose = require('mongoose')
const Schema = mongoose.Schema

function claimSchemas () {
  return Schema({
    title: { type: String, required: true }
  })
}

module.exports = claimSchemas

