const mongoose = require('mongoose')
const Schema = mongoose.Schema

function roleSchemas () {
  return Schema({
    title: { type: String, required: true },
    privilage: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Claim', default: null }
    ]
  },
  {timestamps: { createdAt: 'created_at' }}
  )
}

module.exports = roleSchemas

