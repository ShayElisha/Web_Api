const mongoose= require('mongoose')
require('dotenv').config()
mongoose.pluralize(null)

const userSchema = new mongoose.Schema({
     Uid:Number,
     FullName:String,
     UserName:String,
     Email:String,
     Password:String,
     Address:String
})

module.exports= mongoose.model('user',userSchema)