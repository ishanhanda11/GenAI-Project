const app = require('./src/index')
// const generateInterviewReport = require('./src/services/auth.ai')
// const {resume, selfDescription, jobDescription} =  require('./src/services/temp')
// generateInterviewReport({resume,selfDescription,jobDescription})
const PORT = process.env.PORT || 3000
app.listen(PORT,"0.0.0.0", ()=>{
    console.log(`port running on server ${PORT}`)
})