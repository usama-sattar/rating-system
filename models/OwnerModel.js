const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ownerSchema = new Schema({
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
  
const Owner = mongoose.model('Owner', ownerSchema)
module.exports = Owner