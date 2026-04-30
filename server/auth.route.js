const {Router} = require("express")
const authRouter = Router()
const authController = require('./src/controllers/auth.controller')
/**
 * @Route POST api/auth/register
 * @description Register a new user
 * @access public
 */

authRouter.post('/register', authController.registerUserController)
/**
 * @Route POST api/auth/register
 * @description logs in a user
 * @access public
 */
authRouter.post('/login', authController.loginController)
module.exports = authRouter