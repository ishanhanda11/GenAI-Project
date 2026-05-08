require("dotenv").config()
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const prisma = require('./db')
const authRouter = require('../auth.route')
const interviewRouter = require('../auth.interview')
const cors = require('cors')
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))
// async function test() {
//   const user = await prisma.user.create({
//     data: {
//       username: "testuser",
//       email: "test@gmail.com",
//       password: "123456"
//     }
//   });

//   console.log(user);
// }
app.use('/api/auth', authRouter)
app.use('/api/interview', interviewRouter)
// test();
module.exports = app