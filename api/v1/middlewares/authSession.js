const jwt= require('jsonwebtoken');
module.exports=(req,res,next)=>{
     try{
          if(req.session.User==undefined){
               return res.status(401).json({msg:"you are not authorized"});
          }
          
          next();

     }
     catch(error){
          console.log(error)
          return res.status(401).json({msg:"you are not authorized"})
     }
}