const mongoose = require('mongoose')

const Schema = mongoose.Schema

function userSchemas () {
  return Schema({
    firstname: { type: String, required: false },
    middlename: { type: String, required: false },
    surname: { type: String, required: false },
    dob: { type: Date, required: false },
    address: { type: String, required: false },
    sex: { type: String, required: false },
    isActive: { type: Boolean, required: false },
    phone: { type: Number, required: false },
    state: { type: String, required: false },
    religion: { type: String, required: false },
    maritalStatus: { type: String, required: false },
    username: { type: String, required: true },
    password: { type: String, required: true },
    access_level: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Role', default: null }
    ]
    // timestamps: { createdAt: 'created_at' }
  })
}

module.exports = userSchemas
