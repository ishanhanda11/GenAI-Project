const prisma = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
/**
 * @name registerUserController
 * @description register a new user and expects username , email and password in req.body
 * @acess public
 */
const registerUserController=async(req,res)=>{
    const {username, email, password} = req.body
    if(!username || !email || !password){
        return res.status(400).json({message: "please enter username email and password"})
    }
    const isUserAlreadyExists = await prisma.user.findFirst({
        where:{
            OR : [{username},{email}]
        }
    })
    if (isUserAlreadyExists){
        return res.status(400).json({message: "Username or email already exists"})
    }
    const hashedpassword = await bcrypt.hash(password,10)
    const user = await prisma.user.create({
      data: {
      username: username,
      email: email,
      password: hashedpassword
    }
    })
    const token = jwt.sign({id:user.id, username:username}, process.env.JWT_SECRET, {"expiresIn": "1d"})
    res.cookie("token", token)
    res.status(201).json({message:"user created successfully"})
}

const loginController = async(req,res)=>{
    const {email,password} = req.body
    const user = await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(!user){
        return res.status(400).json({message:"email does not exist"})
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if(!isValidPassword){
        return res.status(400).json({message:"password does not exist"})
    }
    const token = jwt.sign({id:user.id, username:user.username}, process.env.JWT_SECRET, {"expiresIn":"1d"})
    res.cookie("token",token)
   res.status(200).json({
  message: "Logged in successfully",
  user: {
    id: user.id,
    username: user.username,
    email: user.email
  }
})
}
module.exports = {registerUserController, loginController}