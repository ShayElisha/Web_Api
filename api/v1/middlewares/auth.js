
module.exports=(req,res,next)=>{
     try{
          const authHeader= req.headers.authoriztion;
          const arr= authHeader.split(' ');
          const token= arr[1];
          const user =jwt.verify(token,process.env.PRIVATE_KEY)
          req.user=user
          next()
     }
     catch{
          console.log(error)
          return res.status(401).json({msg:"you are not authorized"})
     }
}