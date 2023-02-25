const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    description:
    {
        type:String
    },
    video:{
        type:String
    }
})
//! exporting along with the model
module.exports = mongoose.model('Movie',movieSchema)