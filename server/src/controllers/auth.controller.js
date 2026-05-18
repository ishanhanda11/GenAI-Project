const prisma = require('../db/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {userSchema, userSchemaLogin} = require('../db/userSchema')
/**
 * @name registerUserController
 * @description register a new user and expects username , email and password in req.body
 * @acess public
 */
const registerUserController=async(req,res)=>{
    try{
        const result = userSchema.safeParse(req.body)
     if (!result.success) {
        return res.status(400).json({
            success: false,
            errors: result.error.issues
        })
    }
   
    const {username,email,password} = result.data

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
      username,
      email,
      password: hashedpassword
    }
    })
    const token = jwt.sign({id:user.id, username:user.username}, process.env.JWT_SECRET, {"expiresIn": "1d"})
    res.cookie("token", token, {
    httpOnly: true,   // prevents XSS attacks
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000
})
    res.status(201).json({message:"user created successfully", user:{
      id: user.id,
      username : user.username,
      email : user.email
    }})
}catch(err){
    console.log(err)
    res.status(500).json({ message: "Server error" })
}
}

const loginController = async(req,res)=>{
    try{
    const result = userSchemaLogin.safeParse(req.body)
    if (!result.success) {
        return res.status(400).json({
            success: false,
            errors: result.error.issues
        })
        }
    const {email, password} = result.data
    const user = await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(!user){
        return res.status(400).json({success: false, message:"email or password does not exist"})
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if(!isValidPassword){
        return res.status(400).json({message:"email or password does not exist"})
    }
    const token = jwt.sign({id:user.id, username:user.username}, process.env.JWT_SECRET, {"expiresIn":"1d"})
    res.cookie("token", token, {
    httpOnly: true,   // prevents XSS attacks
    secure: process.env.NODE_ENV === "production",    
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000
})
   res.status(200).json({
  message: "Logged in successfully",
  user: {
    id: user.id,
    username: user.username,
    email: user.email
  }
})
    }catch(err){
    console.log(err)
    res.status(500).json({ message: "Server error" })
    }
}

const logoutUserController = async (req, res) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(400).json({ message: "No token found" })
    }

    const decoded = jwt.decode(token)

    await prisma.blacklistedToken.create({
      data: {
        token,
        expiresAt: new Date(decoded.exp * 1000)
      }
    })

    res.clearCookie("token", {
     httpOnly: true,   // prevents XSS attacks
     secure: process.env.NODE_ENV === "production",    
     sameSite: "strict"
})

    res.status(200).json({ message: "Logged out successfully" })

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

const getMeController=async(req,res)=>{
    const user = req.user.id
    try{
    
    const data = await prisma.user.findUnique({where:{
        id : user
    }})
    if(!data){
        return res.status(404).json({ message: "User not found" })
    }
    res.status(200).json({user:{
        id: data.id,
        username: data.username,
        email : data.email
    }})
    }catch(err){
        res.status(500).json({ message: "Server error" })
    }
}
module.exports = {registerUserController, loginController, logoutUserController, getMeController}