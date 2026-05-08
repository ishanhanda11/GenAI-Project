
const pdfParse = require("pdf-parse");
const generateInterviewReport = require("../services/auth.ai");
const prisma = require("../db");

const generateInterviewReportController = async (req, res) => {
  try {
    const resumeFile = req.file;

    if (!resumeFile) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    // ✅ FIX 1: await pdf parsing
    const pdfData = await (new pdfParse.PDFParse(Uint8Array.from(resumeFile.buffer))).getText();
    const resumeContent = pdfData.text;

    const { selfDescription, jobDescription } = req.body;

    // ✅ Call AI
    const aiData = await generateInterviewReport({
      resume: resumeContent,
      selfDescription,
      jobDescription,
    });
    
    console.log("AI Data returned:", JSON.stringify(aiData, null, 2));
    console.log("Title from AI:", aiData.title);
    console.log("Technical Questions count:", aiData.technicalQuestions?.length || 0);
    console.log("Behavioral Questions count:", aiData.behavioralQuestions?.length || 0);
    console.log("Skill Gaps count:", aiData.skillsGap?.length || 0);
    console.log("Preparation Plan count:", aiData.preparationPlan?.length || 0);
   
    // ✅ Prepare data for creation
    const title = aiData.title && aiData.title.trim() !== '' ? aiData.title : "Interview Report";
    const reportData = {
      jobDescription,
      resume: resumeContent,
      selfDescription,
      title: title,
      typeScore: aiData.matchScore || 0,
    };
    
    console.log("Creating interview report with title:", title);
    console.log("Creating interview report with data:", reportData);
    
    // ✅ Create technical questions
    const technicalQuestionsData = (aiData.technicalQuestions || []).map(q => ({
      question: q.question,
      intention: q.intention,
      answer: q.answer,
    }));
    
    // ✅ Create behavioral questions
    const behavioralQuestionsData = (aiData.behavioralQuestions || []).map(q => ({
      question: q.question,
      intention: q.intention,
      answer: q.answer,
    }));
    
    // ✅ Create skill gaps
    const skillGapsData = (aiData.skillsGap || []).map(s => ({
      skill: s.skill,
      severity: s.severity,
    }));
    
    // ✅ Create preparation plan
    const preparationPlanData = (aiData.preparationPlan || []).map(p => ({
      day: p.day,
      focus: p.focus,
      tasks: p.tasks || [],
    }));

    // ✅ Create report with nested relations
    const interviewReport = await prisma.interviewReport.create({
      data: {
        ...reportData,
        user: {
          connect: { id: req.user.id }
        },
        technicalQuestions: {
          create: technicalQuestionsData
        },
        behavioralQuestions: {
          create: behavioralQuestionsData
        },
        skillGaps: {
          create: skillGapsData
        },
        preparationPlan: {
          create: preparationPlanData
        },
      },
      include: {
        technicalQuestions: true,
        behavioralQuestions: true,
        skillGaps: true,
        preparationPlan: true,
      }
    });
    
    console.log("Interview Report created with relations:", JSON.stringify(interviewReport, null, 2));

    res.status(201).json({
      message: "Interview report generated successfully",
      interviewReport,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
/**
 * @description gets interview report by interview id
 * @route POST api/interview/:interviewId
 * @access Private
 */
const getInterviewReportById = async (req, res) => {
  try {
    const { interviewId } = req.params;
    console.log("Fetching interview report with ID:", interviewId);
    console.log("User ID:", req.user.id);
    
    const interviewReport = await prisma.interviewReport.findFirst({
      where: { id: parseInt(interviewId), userId: req.user.id },
      include: {
        technicalQuestions: true,
        behavioralQuestions: true,
        skillGaps: true,
        preparationPlan: true,
      },
    })
    
    console.log("Interview Report fetched:", JSON.stringify(interviewReport, null, 2));
    
    if(!interviewReport){
      return res.status(404).json({message : "Interview Report not found"})
    }
    res.status(200).json({message: "interview report fetched succesfully",
      interviewReport
    });
  } catch (error) {
    console.error("Error fetching interview report:", error);
    res.status(500).json({
      message: "Error fetching interview report",
      error: error.message
    });
  }
}
const getAllInterviewReport = async(req,res)=>{
  try {
    console.log("Fetching all interview reports for user:", req.user.id);
    
    const InterviewReport = await prisma.interviewReport.findMany({
      where:{
        userId: req.user.id
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        technicalQuestions: true,
        behavioralQuestions: true,
        skillGaps: true,
        preparationPlan: true,
      }
    })
    
    console.log("Reports fetched:", InterviewReport.length);
    
    if(!InterviewReport || InterviewReport.length === 0){
      return res.status(404).json({message: "No reports found"})
    }
    res.status(200).json({message: "reports fetched successfully", 
      InterviewReport
    })
  } catch (error) {
    console.error("Error fetching all reports:", error);
    res.status(500).json({
      message: "Error fetching reports",
      error: error.message
    });
  }
}

module.exports = { generateInterviewReportController, getInterviewReportById, getAllInterviewReport };