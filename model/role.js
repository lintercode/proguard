const mongoose = require('mongoose')

const Schema = mongoose.Schema

const roleSchema = new Schema({
  title: { type: String, required: true },
  privilege: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Claim', default: null }],
},
{ timestamps: { createdAt: 'created_at' } }
)

module.exports = roleSchema
