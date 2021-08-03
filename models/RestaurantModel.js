const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
    owner:{
        type: Schema.Types.ObjectId, ref: 'Owner'
    },
    name:{
        type: String, minlength: 2, required:true
    },
    address:{
        type: String
    },
    ratingCount:{
        type : Number,
        default: 0   
    },
    ratingSum:{
        type : Number,
        default: 0   
    },
    },{
        timestamps: true
    })
  
const Restaurant = mongoose.model('Restaurant', restaurantSchema)
module.exports = Restaurant