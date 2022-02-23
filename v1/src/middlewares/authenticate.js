const httpStatus = require("http-status");
const JWT = require("jsonwebtoken")
const authenticateToken = (req,res,next) => {
   const authHeader =  req.headers["authorization"];
   const token = req.headers?.authorization?.split(" ")[1] || null
   if(token === null){
    return res.status(httpStatus.UNAUTHORIZED).send({error : "Bu işlemi yapmak için ilk olarak giriş yapılmalıdır."})
   }

   JWT.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY,(err,user) => {
       if(err){
           return res.status(httpStatus.FORBIDDEN).send({error : err})
       }
       req.user = user?.dataValues;
       next();
   })
}

module.exports = authenticateToken;