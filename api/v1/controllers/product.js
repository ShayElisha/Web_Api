const jwt= require('jsonwebtoken')
const bcrypt= require('bcrypt');
require('express-session');
const mysql= require('mysql2')

module.exports={
     getAllProducts:async (req,res)=>{
          const conn= global.db // שליפת הקןנקשן מתוך הזכרון הגלובלי
          conn.query("select * from t_Product",(error,results,fields)=>{
               if(error)
                    return res.status(500).json(error);
               else
                    return res.status(200).json(results);
          })
          },
     GetProductByID:(req,res)=>{
          const conn= global.db
          let pid= req.params.id
          conn.query("select * from t_Product WHERE pid=?",pid,(error,results,fields)=>{
               if(error)
                    return res.status(500).json(error);
               else
                    return res.status(200).json(results);})
          },
     AddNewProduct:(req,res)=>{
          const conn= global.db
          const {price,pname,picname,pdesc}= req.body
          conn.query("insert into t_Product (price,pname,picname,pdesc) values(?,?,?,?)",[price,pname,picname,pdesc],(error,results,fields)=>{
               if(error)
                    return res.status(500).json(error);
               else
                    return res.status(200).json(results);})
     },
     UpdateProduct:(req,res)=>{
          const conn= global.db
          let pid= req.params.id
          const {price,pname,picname,pdesc}= req.body
          conn.query("update t_Product set price=?,pname=?,picname=?,pdesc=? where pid=?",[price,pname,picname,pdesc,pid],(error,results,fields)=>{
               if(error)
                    return res.status(500).json(error);
               else
                    return res.status(200).json(results);
               })
     },
     deleteProduct:(req,res)=>{
          const conn= global.db
          let pid= req.params.id
          conn.query("DELETE FROM t_Product WHERE pid=?", pid,(error,results,fields)=>{
               if(error)
                    return res.status(500).json(error);
               else
                    return res.status(200).json(results);
               })
     },
}