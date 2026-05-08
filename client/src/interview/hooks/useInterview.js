import { useContext } from "react";
import {InterviewContext} from "../interview.context"
import {generateInterviewReport, getInterviewReportById, getAllInterviewReport} from '../services/interview.api'


export const useInterview = ()=>{
    const Context = useContext(InterviewContext)
    const {loading, setLoading, report, setReport, reports, setReports} = Context
    
    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    setLoading(true)
    try {
        const response = await generateInterviewReport({
            jobDescription,
            selfDescription,
            resumeFile
        })

        if(response && response.interviewReport) {
            setReport(response.interviewReport)
            return response.interviewReport
        } else {
            console.error("Invalid response structure:", response)
            return null
        }

    } catch (err) {
        console.error("Error generating interview report:", err)
        return null
    } finally {
        setLoading(false)
    }
}

    const getReportById = async(interviewId) => {
        try{
            setLoading(true)
            const response = await getInterviewReportById(interviewId)
            if(response && response.interviewReport) {
                setReport(response.interviewReport)
            } else {
                console.error("Invalid response structure:", response)
            }
        }catch(err){
            console.error("Error in getReportById:", err)
        }finally{
            setLoading(false)
        }
    }

    const getAllReport = async () =>{
        try{
            setLoading(true)
            const response = await getAllInterviewReport()
            if(response && response.interviewReports) {
                setReports(response.interviewReports)
            } else if(response && response.InterviewReport) {
                setReports(response.InterviewReport)
            } else {
                console.error("Invalid response structure:", response)
            }
        }catch(err){
            console.error("Error fetching all reports:", err)
        }finally{
            setLoading(false)
        }

    }

    return {loading, report, reports, generateReport, getReportById, getAllReport}
}

