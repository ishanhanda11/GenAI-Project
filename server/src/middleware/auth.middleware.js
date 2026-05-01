const jwt = require('jsonwebtoken')
const prisma = require('../db')

const authMiddleware = async(req,res,next)=>{
    const token = req.cookies.token
    if(!token){
       return res.status(401).json({
            message:"login first"
        })
    }
    const isTokenBlacklisted = await prisma.blacklistedToken.findUnique({
        where : {
            token : token
        }
    })
    if (!isTokenBlacklisted){
        return res.status(401).json({message : "Token is Invalid"})
    }
    try{

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    }catch(err){
        res.status(401).json({message:"Invalid token"})
    }
    }

module.exports = authMiddleware