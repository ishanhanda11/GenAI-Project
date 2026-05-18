import { createContext } from "react";
import { useContext, useState } from "react";

export const InterviewContext = createContext();

export const InterviewProvider = ({children})=>{
    const [loading, setLoading] = useState(false)
    const [report, setReport] = useState(null)
    const [reports, setReports] = useState([])
    const resetReports = () => {
    setReports([])
    setReport(null)
    }
    return(
        <InterviewContext.Provider value={{loading, setLoading, report, setReport, reports, setReports,resetReports}}>
            {children}
        </InterviewContext.Provider>
    ) 

}