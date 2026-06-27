import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";
import { FileText, Brain, Briefcase, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({
    averageScore: 0,
    totalResumes: 0,
    analysisCount: 0,
    jobMatches: 0,
    bestResume: "",
    latestResume: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard");
      setDashboard(response.data);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
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

  const cards = [
    {
      title: "ATS Score",
      value: `${dashboard.averageScore}%`,
      icon: Award,
    },
    {
      title: "Total Resumes",
      value: dashboard.totalResumes,
      icon: FileText,
    },
    {
      title: "Analyses",
      value: dashboard.analysisCount,
      icon: Brain,
    },
    {
      title: "Job Matches",
      value: dashboard.jobMatches,
      icon: Briefcase,
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome Back 👋
          </h1>

          <p className="text-slate-400 mt-2">
            Track your resume performance and ATS insights.
          </p>

          <div className="flex gap-4 mt-5">
            <button
              onClick={() => navigate("/upload")}
              className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg text-white font-medium transition"
            >
              Upload Resume
            </button>

            <button
              onClick={() => navigate("/my-resumes")}
              className="bg-slate-800 hover:bg-slate-700 px-5 py-2 rounded-lg text-white font-medium transition"
            >
              My Resumes
            </button>
          </div>
        </div>

        {/* Empty State */}
        {dashboard.totalResumes === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
            <h2 className="text-2xl font-bold text-white">
              No Resume Uploaded
            </h2>

            <p className="text-slate-400 mt-3">
              Upload your first resume and start AI analysis.
            </p>

            <button
              onClick={() => navigate("/upload")}
              className="mt-6 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg text-white font-semibold transition"
            >
              Upload Resume
            </button>
          </div>
        ) : (
          <>
            {/* Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {cards.map((card, index) => {
                const Icon = card.icon;

                return (
                  <div
                    key={index}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500 transition"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-slate-400 text-sm">
                          {card.title}
                        </p>

                        <h2 className="text-3xl font-bold text-white mt-3">
                          {card.value}
                        </h2>
                      </div>

                      <div className="bg-cyan-500/10 p-3 rounded-xl">
                        <Icon className="text-cyan-400 h-6 w-6" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Resume Insights */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-5">
                Resume Insights
              </h2>

              <div className="space-y-5">

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">
                    Best Resume
                  </span>

                  <span className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-lg">
                    {dashboard.bestResume || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">
                    Latest Resume
                  </span>

                  <span className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-lg">
                    {dashboard.latestResume || "N/A"}
                  </span>
                </div>

              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Dashboard;