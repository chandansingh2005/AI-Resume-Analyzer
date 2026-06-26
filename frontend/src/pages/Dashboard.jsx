import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";
import { FileText, Brain, Briefcase, Award } from "lucide-react";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    averageScore: 0,
    totalResumes: 0,
    analysisCount: 0,
    jobMatches: 0,
    bestResume: "",
    latestResume: "",
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard");
      setDashboard(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

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
      <div className="space-y-10 p-6 max-w-7xl mx-auto">
        
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome Back 👋
          </h1>
          <p className="text-slate-400 mt-2">
            Track your resume performance and ATS insights.
          </p>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-200 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">
                      {card.title}
                    </p>
                    <h2 className="text-3xl text-white font-bold mt-3">
                      {card.value}
                    </h2>
                  </div>
                  <div className="bg-cyan-500/10 p-3 rounded-xl border border-cyan-500/20">
                    <Icon className="text-cyan-400 h-6 w-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Insights Panel */}
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
          <h2 className="text-white text-xl font-semibold mb-4">
            Resume Insights
          </h2>
          <div className="space-y-4 text-slate-300">
            <p className="flex items-center">
              <span className="text-slate-400 min-w-[120px]">Best Resume:</span>
              <span className="text-cyan-400 font-medium ml-2 bg-slate-800/50 px-3 py-1 rounded-lg border border-slate-700/30">
                {dashboard.bestResume || "No Resume Available"}
              </span>
            </p>
            <p className="flex items-center">
              <span className="text-slate-400 min-w-[120px]">Latest Resume:</span>
              <span className="text-cyan-400 font-medium ml-2 bg-slate-800/50 px-3 py-1 rounded-lg border border-slate-700/30">
                {dashboard.latestResume || "No Resume Available"}
              </span>
            </p>
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;