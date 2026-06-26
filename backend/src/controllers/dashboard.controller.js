const Resume = require("../models/resume.model");

const getDashboard = async (req, res) => {

    try {

        const resumes = await Resume.find({
            userId: req.user.id
        }).lean();

        const totalResumes = resumes.length;

        const analysisCount = resumes.filter(
            (resume) => resume.analysis
        ).length;

        const totalScore = resumes.reduce((sum, resume) => {
            return sum + (resume.analysis?.atsScore || 0);
        }, 0);

        const averageScore =
            totalResumes > 0
                ? Math.round(totalScore / totalResumes)
                : 0;

        let bestScore = 0;
        let bestResume = null;

        resumes.forEach((resume) => {

            const score = resume.analysis?.atsScore || 0;

            if (score > bestScore) {
                bestScore = score;
                bestResume = resume.title;
            }

        });

        const latestResume =
            resumes.length > 0
                ? resumes.sort(
                    (a, b) =>
                        new Date(b.createdAt) -
                        new Date(a.createdAt)
                )[0].title
                : null;

        res.status(200).json({

            totalResumes,

            analysisCount,

            averageScore,

            bestScore,

            bestResume,

            latestResume,

            jobMatches: resumes.reduce((sum, resume) => {
                return sum + (resume.analysis?.recommendedRoles?.length || 0);
            }, 0)

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Dashboard data fetch failed"
        });

    }

};

module.exports = {
    getDashboard
};