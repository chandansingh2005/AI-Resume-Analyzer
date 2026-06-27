import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function MyResumes() {
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const [resumes, setResumes] = useState([]);

    useEffect(() => {
        fetchResumes();
    }, []);
    const handleAnalyze = async (resumeId) => {
        try {
            toast.loading("Analyzing Resume...", {
                id: "analyze"
            });
            await api.get(`/analysis/${resumeId}`);

            toast.success("Resume analyzed successfully!", {
                id: "analyze"
            });

            navigate(`/resume/${resumeId}`);
        } catch (error) {
            toast.error("Analysis failed");
        }
    };

    const handleDelete = async (resumeId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this resume?");
        if (!confirmDelete) return;

        try {
            await api.delete(`/resume/${resumeId}`);
            toast.success("Resume deleted successfully");
            fetchResumes(); // Refresh data grid list
        } catch (error) {
            console.error("Error deleting resume:", error);

            // Fallback error fallback if backend sends a custom message
            const errorMessage = error.response?.data?.message || "Failed to delete resume";
            toast.error(errorMessage);
        }
    };
   const fetchResumes = async () => {
    setLoading(true);

    try {
        const response = await api.get("/resume");
        setResumes(response.data.data);
    } catch (error) {
        toast.error("Failed to load resumes");
        console.log(error);
    } finally {
        setLoading(false);
    }
};
if (loading) {
    return (
        <Layout>
            <div className="flex justify-center items-center h-[70vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            </div>
        </Layout>
    );
}

    return (
        <Layout>

            <h1 className="text-3xl font-bold text-white mb-6">
                My Resumes
            </h1>

           <div className="grid gap-4">

    {resumes.length === 0 ? (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">

            <h2 className="text-2xl font-bold text-white">
                No Resume Uploaded
            </h2>

            <p className="text-slate-400 mt-3">
                Upload your first resume to start AI analysis.
            </p>

            <button
                onClick={() => navigate("/upload")}
                className="mt-6 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg text-white font-semibold"
            >
                Upload Resume
            </button>

        </div>

    ) : (

        resumes.map((resume) => (

            <div
                key={resume._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500 transition"
            >
                <h2 className="text-2xl font-semibold text-white">
                    {resume.title}
                </h2>

                <p className="text-slate-400 mt-2">
                    Uploaded:{" "}
                    {new Date(resume.createdAt).toLocaleDateString()}
                </p>

                <div className="flex gap-4 mt-5">

                    <button
                        onClick={() => handleAnalyze(resume._id)}
                        className="px-4 py-2 rounded-lg bg-cyan-500 text-white cursor-pointer"
                    >
                        {resume.analysis?.atsScore
                            ? "View Analysis"
                            : "Analyze Resume"}
                    </button>

                    <button
                        onClick={() => handleDelete(resume._id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors cursor-pointer"
                    >
                        Delete
                    </button>

                </div>

            </div>

        ))

    )}

</div>

        </Layout>
    );
}

export default MyResumes;