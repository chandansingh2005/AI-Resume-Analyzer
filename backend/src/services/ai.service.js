const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function analyzeResumeWithAI(resumeText) {

    const prompt = `
You are an ATS Resume Analyzer.

Analyze the following resume:

${resumeText}

Return ONLY valid JSON.

{
  "atsScore": number,
  "resumeSummary": string,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "recommendedRoles": [],
  "keywordAnalysis": {
      "present": [],
      "missing": []
  },
  "suggestions": []
}
`;
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    const text = response.text;
    // remove markdown
    const cleanedText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(cleanedText);
}

module.exports = { analyzeResumeWithAI };
