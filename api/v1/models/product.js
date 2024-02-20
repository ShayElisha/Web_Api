const mongoose= require('mongoose')
require('dotenv').config()
mongoose.pluralize(null)

const ProductSchema = new mongoose.Schema({
     pid:Number,
     Price:Number,
     Pname:String,
     Pic:String,
     Desc:String
})

module.exports= mongoose.model('product',ProductSchema)