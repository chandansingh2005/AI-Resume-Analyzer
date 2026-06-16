const { extractTextFromPDF } = require('../services/parser.service');
const resumeModel = require('../models/resume.model')

const { analyzeResumeWithAI } = require('../services/ai.service')

async function analyzeResume(req, res) {

    try {
        const resumeId = req.params.id;
        const resume = await resumeModel.findById(resumeId);

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" })
        }

        const extractedText = await extractTextFromPDF(resume.fileUrl)

        return res.status(200).json({
            message: "Resume text extracted successfully",
            extractedText
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })

    }


}

async function testAI(req, res) {

    try {
        const response = await analyzeResumeWithAI();
        return res.status(200).json({
            success: true,
            response
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message })

    }
}

module.exports = { analyzeResume, testAI };