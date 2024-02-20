const user= require('../models/user')
const jwt= require('jsonwebtoken')
const bcrypt= require('bcrypt');
const session=require('express-session');

module.exports={
     getAllUsers:(req,res)=>{
          user.find().then((data)=>{
               return res.status(200).json({data})
          })
     },
     GetUserByID:(req,res)=>{
          let Uid= req.params.id
          user.find({Uid}).then((data)=>{
               return res.status(200).json({data})
          })
     },
     AddNewUser:(req,res)=>{
          user.insertMany([body]).then((data)=>{
               return res.status(200).json({data})
          })
          
     },
     UpdateUser:(req,res)=>{
          let Uid= req.params.id
          let body= req.body;
          user.updateOne({Uid},body).then((data)=>{
               return res.status(200).json({data})
          })
     },
     deleteUser:(req,res)=>{
          let Uid= req.params.id
          user.deleteOne({Uid}).then((data)=>{
               return res.status(200).json({msg:`user ${Uid} is deletded`})
          })
     },
     register:(req,res)=>{
          const {Uid,Email,Password,UserName,FullName,Address}= req.body
          user.find({Email}).then((results)=>{
               if(results.length>0)
                    return res.status(401).json({msg:"that user is already exist"})
               bcrypt.hash(Password,10).then((hashPass)=>{
                         user.insertMany({Uid,FullName,UserName,Email,Password:hashPass,Address}).then((result)=>{
                              return res.status(200).json(result)
                         })
                    })
          })
     },
     Login:(req,res)=>{
          if (!req.session) {
               req.session = {};
          }
          const {Email,Password}=req.body;
          user.find({Email}).then((result)=>{
               if(result.length==0)
                    return res.status(200).json({msg:"Email or password are wrong"})
          
          const hashPass= result[0].Password;
          bcrypt.compare(Password,hashPass).then((status)=>{
               if(!status)
                    return res.status(200).json({msg:"Email or password are wrong"})
               const MyUser= result[0];
               const token = jwt.sign({Email,FullName:MyUser.FullName,Password},process.env.PRIVATE_KEY,{expiresIn:'1h'})
               const UserData={Email,Password,Fullname:MyUser.FullName};
               req.session.User=UserData;
               return res.status(200).json({msg:"user login successfuly",token,User:UserData})
          })})
     }
}