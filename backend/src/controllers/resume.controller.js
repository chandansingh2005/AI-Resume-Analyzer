const resumeModel = require('../models/resume.model');

async function createResume(req, res) {
    try {
        const userId = req.user.id;
        const { title, skills } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Resume PDF is required" });
        }

        const fileUrl = req.file.secure_url || req.file.path;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const existingResume = await resumeModel.findOne({ userId, title });
        if (existingResume) {
            return res.status(409).json({ message: "Resume with this title already exists" });
        }

        const skillsArrays = skills ? skills.split(",").map(skill => skill.trim()) : [];

        const resume = await resumeModel.create({
            userId,
            title,
            fileUrl,
            skills: skillsArrays
        });

        return res.status(201).json({
            message: "Resume created successfully",
            resumeId: resume._id,
            data: resume
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
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
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function deleteResume(req, res) {
    try {
        const resumeId = req.params.id;
        const deleted = await resumeModel.findByIdAndDelete({
            _id: resumeId,
            userId: req.user.id
        });
        if (!deleted) {
            return res.status(404).json({ message: "Resume not found" });
        }
        return res.status(200).json({ message: "Resume deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function getResumeById(req, res) {

    try {
        const resumeId = req.params.id;
        const resume = await resumeModel.findOne({
            _id: resumeId,
            userId: req.user.id
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume  not found"
            });
        }
        return res.status(200).json({
            success: true,
            data: resume
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

}

async function updateResume(req, res) {
    try {
        const resumeId = req.params.id;
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const resume = await resumeModel.findOne({
            _id: resumeId,
            userId: req.user.id
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        resume.title = title;
        await resume.save();

        return res.status(200).json({
            success: true,
            message: "Resume updated successfully",
            data: resume
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }


}

async function getSingleResume(req, res) {
    try {

        const resumeId = req.params.id;

        const resume = await resumeModel.findOne({
            _id: resumeId,
            userId: req.user.id
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: resume
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports = {
    createResume,
    getUserResume,
    deleteResume,
    getResumeById,
    updateResume,
    getSingleResume
};