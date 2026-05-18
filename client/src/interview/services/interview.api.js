import axios from 'axios'
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "",
    withCredentials: true
})
/**
 * @description generates interview report based on the resume, job description and self description provided by the user
 * @route POST api/interview
 * @access Private
 */

export async function generateInterviewReport({ jobDescription, selfDescription, resumeFile }) {
  const formData = new FormData()
  formData.append('jobDescription', jobDescription)
  formData.append('selfDescription', selfDescription)
  formData.append("resume", resumeFile)
  const response = await api.post("/api/interview/", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  })
  return response.data  
}
/**
 * 
 * @description gets interview report by interview id
 * @route GET api/interview/report/:interviewId
 * @access Private 
 */
export async function getInterviewReportById (interviewId){
    try{
        const response = await api.get(`/api/interview/report/${interviewId}`)
        return response.data
    }catch(err){
        console.error("Error fetching interview report:", err)
        throw err
    }
}
/**
 * 
 * @description gets all interview report of the user
 * @route GET api/interview/report/all
 * @access Private
 */
export async function getAllInterviewReport(){
    try{
        const response = await api.get('/api/interview/report/all')
        return response.data
    }catch(err){
        console.error("Error fetching all interview reports:", err)
        throw err
    }
}