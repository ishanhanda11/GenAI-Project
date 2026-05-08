const prompt = `
You are an expert technical interviewer.

Generate an interview report STRICTLY in the following JSON structure:

{
  "matchScore": number (0–100),
  "technicalQuestions": [{ "question": string, "intention": string, "answer": string }],
  "behavioralQuestions": [{ "question": string, "intention": string, "answer": string }],
  "skillsGap": [{ "skill": string, "severity": "low" | "medium" | "high" }],
  "preparationPlan": [{ "day": number, "focus": string, "tasks": string[] }]
}

IMPORTANT:
- Do NOT include fields like candidateName, strengths, evaluation, recommendation
- Follow the structure EXACTLY
- Return ONLY valid JSON

---

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

module.exports = prompt