const mongoose = require('mongoose')
const db = require('../config/DB')

const userSchema = new mongoose.Schema(
    {  
        _id : mongoose.Schema.Types.ObjectId,
        'name': { type: String },
        'age': { type: Number },
        'location': { type: String },
        'department': { type: String }
    }
)

module.exports = mongoose.model('users', userSchema)