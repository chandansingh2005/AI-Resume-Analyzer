const resumeModel = require('../models/resume.model');

async function createResume(req, res) {

    try {
        const userId = req.user.id;
        const { title, fileUrl, skills } = req.body;

        // check validation
        if (!title || !fileUrl) {
            return res.status(400).json({ message: "Title and fileUrl are required" })
        }

        const existingResume = await resumeModel.findOne({
            userId,
            title
        });

        if (existingResume) {
            return res.status(409).json({
                message: "Resume with this title already exists"
            })
        }


        const resume = await resumeModel.create({
            userId,
            title,
            fileUrl,
            skills

        })

        return res.status(201).json({
            message: "Resume created successfully",
            resumeId: resume._id,
            data: resume,
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal error"
        })

    }
}

async function getUserResume(req, res) {
    try {
        const userId = req.user.id;
        const resume = await resumeModel.find({ userId });

        return res.status(200).json({
            message: "Resume fetched successfully",
            count: resume.length,
            data: resume
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Erroe"
        })

    }
}

module.exports = { createResume, getUserResume }
