const User = require("../models/user.model");
const Resume = require("../models/resume.model");

const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password");

        const resumes = await Resume.find({
            userId: req.user.id
        });

        const totalResumes = resumes.length;

        const bestATS = Math.max(
            ...resumes.map(r => r.analysis?.atsScore || 0),
            0
        );

        const averageATS =
            totalResumes > 0
                ? Math.round(
                    resumes.reduce(
                        (sum, r) => sum + (r.analysis?.atsScore || 0),
                        0
                    ) / totalResumes
                )
                : 0;

        res.json({
            user,
            totalResumes,
            averageATS,
            bestATS
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch profile"
        });

    }
};

module.exports = {
    getProfile
};