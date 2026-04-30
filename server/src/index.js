require("dotenv").config()
const express = require('express')
const app = express()
const prisma = require('../db')
const authRouter = require('../auth.route')
app.use(express.json())
async function test() {
  const user = await prisma.user.create({
    data: {
      username: "testuser",
      email: "test@gmail.com",
      password: "123456"
    }
  });

  console.log(user);
}

test();
module.exports = app