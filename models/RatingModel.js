const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ratingSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId, ref: 'User'
    },
    restaurant:{
        type: Schema.Types.ObjectId, ref: 'Restaurant'
    },
    ratingNumber:{ 
        type : Number,
    },
    comment:{
        type:String
    },
    reply:{
        type:String
    },
    date: {
       type: Date,
    }
    },{
        timestamps: true
    })
  
const Rating = mongoose.model('Rating', ratingSchema)
module.exports = Rating