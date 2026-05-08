const app = require('./src/index')
// const generateInterviewReport = require('./src/services/auth.ai')
// const {resume, selfDescription, jobDescription} =  require('./src/services/temp')
// generateInterviewReport({resume,selfDescription,jobDescription})
app.listen(3000, ()=>{
    console.log("port running on server 3000")
})