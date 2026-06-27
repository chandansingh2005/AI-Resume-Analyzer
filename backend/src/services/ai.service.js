const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function analyzeResumeWithAI(resumeText) {

    const prompt = `
You are an expert ATS Resume Analyzer.

Analyze the following resume carefully.

Resume:
${resumeText}

Instructions:
1. Give an ATS score between 0-100.
2. Write a professional resume summary.
3. List strengths.
4. List weaknesses.
5. List missing technical skills.
6. Recommend suitable job roles.
7. Extract important resume keywords.
8. Identify important ATS keywords that are missing.
9. Give practical suggestions for improvement.

Return ONLY valid JSON.

{
  "atsScore": 85,
  "resumeSummary": "string",

  "strengths": [
    "string"
  ],

  "weaknesses": [
    "string"
  ],

  "missingSkills": [
    "string"
  ],

  "recommendedRoles": [
    "string"
  ],

  "keywordAnalysis": {
    "present": [
      "React",
      "JavaScript",
      "Node.js"
    ],
    "missing": [
      "Docker",
      "CI/CD",
      "AWS"
    ]
  },

  "suggestions": [
    "string"
  ]
}

IMPORTANT:
- keywordAnalysis.present MUST contain at least 8 important resume keywords.
- keywordAnalysis.missing MUST contain at least 5 missing ATS keywords whenever possible.
- Never leave keywordAnalysis empty.
- Return ONLY JSON.
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
