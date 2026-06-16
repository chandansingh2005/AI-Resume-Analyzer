const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function analyzeResumeWithAI() {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Can you suggest me any 5 skill for future demand",
    });

    return response.text;
}

module.exports = { analyzeResumeWithAI };