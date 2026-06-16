const { extractTextFromPDF } = require('../services/parser.service');
const resumeModel = require('../models/resume.model')

const { analyzeResumeWithAI } = require('../services/ai.service')

async function analyzeResume(req, res) {

    try {
        const resumeId = req.params.id;
        const resume = await resumeModel.findOne({
            _id: resumeId,
            userId: req.user.id
        });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" })
        }

        // This line for text
        const extractedText = await extractTextFromPDF(resume.fileUrl)

        // This line for ai response 
        const aiResponse = await analyzeResumeWithAI(extractedText);

        // save in MongoDB
        resume.analysis = aiResponse;
        await resume.save();

        return res.status(200).json({
            success: true,
            analysis: aiResponse
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })

    }


}



module.exports = { analyzeResume };