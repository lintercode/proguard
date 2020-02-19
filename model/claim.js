const mongoose = require('mongoose')
const Schema = mongoose.Schema

function claimSchemas () {
  return Schema({
    title: { type: String, required: true }
  },
  {timestamps: { createdAt: 'created_at' }}
  )
}

module.exports = claimSchemas

