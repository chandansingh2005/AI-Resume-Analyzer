import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function MyResumes() {

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

    const fetchResumes = async () => {

        try {

            const response = await api.get("/resume");

            console.log(response.data);
            setResumes(response.data.data);


        } catch (error) {

            toast.error("Failed to load resumes");

            console.log(error);
        }
    };

    return (
        <Layout>

            <h1 className="text-3xl font-bold text-white mb-6">
                My Resumes
            </h1>

            <div className="grid gap-4">

                {resumes.map((resume) => (

                    <div
                        key={resume._id}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500 transition"
                    >
                        <h2 className="text-2xl font-semibold text-white">
                            {resume.title}
                        </h2>

                        <p className="text-slate-400 mt-2">
                            Uploaded:
                            {" "}
                            {new Date(resume.createdAt).toLocaleDateString()}
                        </p>

                        <div className="flex gap-4 mt-5">

                            <button
                                onClick={() => handleAnalyze(resume._id)}
                                className="px-4 py-2 rounded-lg bg-cyan-500 text-white cursor-pointer"
                            >
                                Analyze Resume
                            </button>

                            <button
                                className="px-4 py-2 rounded-lg bg-red-500 text-white"
                            >
                                Delete
                            </button>

                        </div>
                    </div>

                ))}

            </div>

        </Layout>
    );
}

export default MyResumes;