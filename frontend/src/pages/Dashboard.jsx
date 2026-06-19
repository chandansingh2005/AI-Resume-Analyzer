import React from "react";
import Layout from "../components/Layout";
import { FileText, Brain, Briefcase, Award } from "lucide-react";

function Dashboard() {
  const cards = [
    {
      title: "ATS Score",
      value: "80%",
      icon: Award,
    },
    {
      title: "Total Resumes",
      value: "5",
      icon: FileText,
    },
    {
      title: "Analyses",
      value: "12",
      icon: Brain,
    },
    {
      title: "Job Matches",
      value: "8",
      icon: Briefcase,
    },
  ];

  return (
    <Layout>
      <div className="space-y-10 p-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome Back 👋</h1>
          <p className="text-slate-400 mt-2">
            Track your resume performance and ATS insights.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">{card.title}</p>
                    <h2 className="text-3xl font-bold mt-3 text-white">{card.value}</h2>
                  </div>

                  <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white">
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Recent Activity
          </h2>

          <div className="space-y-4 text-slate-300">
            <div className="border-b border-slate-800 pb-3">
              Resume uploaded successfully
            </div>
            <div className="border-b border-slate-800 pb-3">
              ATS score improved from 72% to 80%
            </div>
            <div className="pt-1">
              3 new matching jobs found
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;