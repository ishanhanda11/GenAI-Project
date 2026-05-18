require("dotenv").config()
const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')                          
const app = express()
const prisma = require('./db/db')
const authRouter = require('../auth.route')
const interviewRouter = require('../auth.interview')
const cors = require('cors')

// ✅ Fix CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : ["http://localhost:5173"]

app.use(cors({
    origin: (origin, callback) => {
        if (
            !origin ||
            allowedOrigins.includes(origin) ||         
            /\.compute\.amazonaws\.com$/.test(origin)
        ) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true
}))


app.use(express.static(path.join(__dirname, "../public")))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/interview', interviewRouter)






app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"))
})

module.exports = app