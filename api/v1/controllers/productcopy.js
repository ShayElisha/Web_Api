const product= require('../models/product')
const jwt= require('jsonwebtoken')
const bcrypt= require('bcrypt');
require('express-session');
const db= require('../../../mysql');

module.exports={
     getAllProducts:async (req,res)=>{
          product.find().then((data)=>{
               return res.status(200).json({data})
          })     },
     GetProductByID:(req,res)=>{
          let pid= req.params.id
          product.find({pid}).then((data=>{
               return res.status(200).json({data})
          }))
     },
     AddNewProduct:(req,res)=>{
          if(req.session.user){
          const {pid,Price,Pname,Pic,Desc}= req.body
          product.find({pid}).then((results)=>{
               if(results.length>0)
                    return res.status(400).json({msg:"that product is already exist"})
               product.insertMany({pid,Pname,Pic,Desc,Price}).then((data)=>{
                    return res.status(200).json({data})
          })
     })}     
     else{return res.status(200).json({Msg:'Wrong authentication'})}
},
     UpdateProduct:(req,res)=>{
          let pid= req.params.id
          let body= req.body;
          product.updateOne({pid},body).then((data=>{
               return res.status(200).json({data})
          }))
     },
     deleteProduct:(req,res)=>{
          let pid= req.params.id
          product.deleteOne({pid}).then((data)=>{
               return res.status(200).json({msg:`Product ${pid} is deletded`})
          })
     },
}