const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    email: {
        type: String,
        required:true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    }
    },{
        timestamps: true
    })
  
const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin