const { GoogleGenAI } = require('@google/genai')


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = {
    type: "OBJECT",
    properties: {
        matchScore: {
            type: "NUMBER",
            description: "A score between 0 and 100 indicating how well the candidate's profile matches the job description"
        },
        technicalQuestions: {
            type: "ARRAY",
            description: "Technical questions along with their intention and suggested answers",
            items: {
                type: "OBJECT",
                properties: {
                    question: { type: "STRING", description: "A technical question that may be asked in the interview" },
                    intention: { type: "STRING", description: "The intention behind asking this question" },
                    answer: { type: "STRING", description: "How to answer this question, including key points and approach" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behavioralQuestions: {
            type: "ARRAY",
            description: "Behavioral questions along with their intention and suggested answers",
            items: {
                type: "OBJECT",
                properties: {
                    question: { type: "STRING", description: "A behavioral question that may be asked in the interview" },
                    intention: { type: "STRING", description: "The intention behind asking this question" },
                    answer: { type: "STRING", description: "How to answer this question, including key points and approach" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        skillsGap: {
            type: "ARRAY",
            description: "List of skill gaps along with their severity",
            items: {
                type: "OBJECT",
                properties: {
                    skill: { type: "STRING", description: "The skill that the candidate is lacking" },
                    severity: {
                        type: "STRING",
                        enum: ["low", "medium", "high"],
                        description: "How important it is for the candidate to learn this skill"
                    }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: "ARRAY",
            description: "A day-wise preparation plan to help the candidate prepare for the interview",
            items: {
                type: "OBJECT",
                properties: {
                    day: { type: "NUMBER", description: "Day number in the preparation plan starting from 1" },
                    focus: { type: "STRING", description: "Main focus of the day" },
                    tasks: {
                        type: "ARRAY",
                        description: "Tasks to complete on this day",
                        items: { type: "STRING" }
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        },
        title:{
            type: "STRING",
            description: "Generates title of the Interview Report"
        }
    },
    required: ["matchScore", "technicalQuestions", "behavioralQuestions", "skillsGap", "preparationPlan", "title"]
}
const sanitizeInput=(text, maxLength)=>{
    if (typeof text !== 'string') return ''
    return text.trim().slice(0, maxLength)
}
async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const cleanResume = sanitizeInput(resume,6000)
    const cleanSelfDescription = sanitizeInput(selfDescription,1000)
    const cleanJobDescription = sanitizeInput(jobDescription,2000)
    if (!cleanJobDescription) {
    throw new Error("Job description is required")
  }
    const prompt = `Generate a comprehensive interview report for a candidate with the following details:
    
Resume: ${cleanResume}

Self Description: ${cleanSelfDescription}

Job Description: ${cleanJobDescription}

IMPORTANT: Generate a clear, professional title for this interview report (e.g., "Software Engineer Interview Analysis", "Backend Developer Assessment", etc.). The title should reflect the position and the analysis.

Provide:
1. A match score (0-100) indicating how well the candidate matches the job
2. 3-5 technical interview questions relevant to the job
3. 2-3 behavioral interview questions
4. Key skill gaps the candidate should work on
5. A day-wise preparation plan (3-5 days)
6. A clear title for the report`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: interviewReportSchema
        }
    })

    const parsed = JSON.parse(response.text)
    return parsed
}

module.exports = generateInterviewReport