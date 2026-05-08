const express = require('express')
const authMiddleware = require('./src/middleware/auth.middleware')
const interviewRouter = express.Router()
const interviewController = require('./src/controllers/interview.controller')
const upload = require('./src/middleware/file.middleware')
/**
 * @Route POST api/interview
 * @description generates new interview report basis on the user self description job description and resume
 * @access Private
 */
interviewRouter.post('/',authMiddleware, upload.single('resume'), interviewController.generateInterviewReportController)
/**
 * @description gets all interview reports of the user
 * @route GET api/interview/report/all
 * @access Private
 */
interviewRouter.get('/report/all', authMiddleware, interviewController.getAllInterviewReport)
/**
 * @description gets interview report by interview id
 * @route GET api/interview/report/:interviewId
 * @access Private
 */
interviewRouter.get('/report/:interviewId', authMiddleware, interviewController.getInterviewReportById )
module.exports = interviewRouter