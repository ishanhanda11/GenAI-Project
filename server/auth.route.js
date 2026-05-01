const {Router} = require("express")
const authRouter = Router()
const authController = require('./src/controllers/auth.controller')
const authMiddleware = require("./src/middleware/auth.middleware")
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
/**
 * @Route POST api/auth/logout
 * @description logs out a user
 * @access public
 */
authRouter.get('/logout', authController.logoutUserController)

authRouter.get('/my-get',authMiddleware, authController.getMeController)
module.exports = authRouter