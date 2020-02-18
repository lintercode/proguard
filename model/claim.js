const mongoose = require('mongoose')
const Schema = mongoose.Schema

const claimSchema = new Schema({
  title: { type: String, required: true },
},
{ timestamps: { createdAt: 'created_at' } }
)

module.exports = claimSchema
