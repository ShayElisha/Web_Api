require('dotenv').config()
const express= require('express')
const morgan= require('morgan')
const session= require('express-session')
const mongoose= require('mongoose')
const jwt= require('jsonwebtoken')
const mongoStore= require('connect-mongo')
const app= express();
const mysql= require('mysql2')

const productRoute= require('./api/v1/router/product')

const userRoute= require("./api/v1/router/user")


const twentyMin = 1000 * 60 * 20;
app.use(session({
     secret:'asdsadsdd',
     resave:false,
     saveUninitialized:true,
     cookie:{maxAge:twentyMin},
     store:mongoStore.create({mongoUrl:process.env.CONN_DB+"SessionDB"})
}))

var connection = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'Shay2312',
     database: 'test'
     });
     connection.connect(()=>{
          console.log('connected to MySql')
     });
     global.db= connection;// יצירת משתנה גלובלי שמחזיק את החיבור
     connection.query('SELECT * from t_Product', function (error, results, fields) {
          if (error) throw error;
          console.log('The solution is: ', results);
          });
     
     



const servers1=['10.21.123.23','::1','10.12.12.10']
app.use((req,res,next)=>{
     let i;
     for(i=0;i<servers1.length;i++){
          if(req.ip==servers1[i])
               break
     if(i==servers1.length)
          return res.status(403).json({msg:"Can't recognize The Request"})
     else
          next()
     }
})
app.use(morgan('dev'))
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded())
app.use("/product",productRoute)
app.use("/user",userRoute)


const connDb= process.env.CONN_DB+"Shop";
mongoose.connect(connDb).then((status)=>{
     if(status)
          console.log("connected to DB")
     else
          console.log("can't connected")
})



app.use('*',(req,res)=>{
     return res.status(200).json({msg:"Not Found Page!"})
})



module.exports=app;