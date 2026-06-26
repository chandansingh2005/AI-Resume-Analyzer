import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../api/axios";

function ResumeDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await api.get(`/resume/${id}`);
        setResume(response.data.data);
      } catch (error) {
        console.error("Failed to fetch resume details:", error);
      }
    };
    fetchResume();
  }, [id]);

  // Loading State
  if (!resume) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-xl font-medium text-slate-400 animate-pulse">
            Loading Analysis...
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <h1 className="text-4xl font-bold text-white mb-6">
        {resume.title}
      </h1>

      {/* Top Cards Dashboard Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card: ATS Score */}
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <p className="text-slate-400 text-sm font-medium">
            ATS Score
          </p>
          <h2 className="text-5xl font-bold text-cyan-400 mt-2">
            {resume.analysis?.atsScore || 0}%
          </h2>
        </div>

        {/* Card: Uploaded Date */}
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <p className="text-slate-400 text-sm font-medium">
            Uploaded Date
          </p>
          <h2 className="text-xl text-white mt-2 font-semibold">
            {resume.createdAt ? new Date(resume.createdAt).toLocaleDateString() : "N/A"}
          </h2>
        </div>

        {/* Card: File URL */}
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 flex flex-col justify-between">
          <p className="text-slate-400 text-sm font-medium mb-2">
            Resume PDF
          </p>
          <a
            href={resume.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center transition-colors"
          >
            View Resume <span className="ml-1">↗</span>
          </a>
        </div>
      </div>

      {/* Section: Resume Summary */}
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 mb-8">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">
          Resume Summary
        </h2>
        <p className="text-slate-300 leading-7">
          {resume.analysis?.resumeSummary || "No summary available"}
        </p>
      </div>

      {/* Grid Layout: Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Strengths Container */}
        <div className="bg-slate-900 rounded-xl p-6 border border-emerald-500/20">
          <h2 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
            Strengths
          </h2>
          <ul className="list-disc ml-5 text-slate-300 space-y-2">
            {resume.analysis?.strengths?.length > 0 ? (
              resume.analysis.strengths.map((item, index) => (
                <li key={index}>{item}</li>
              ))
            ) : (
              <li className="text-slate-500 list-none">No strengths found</li>
            )}
          </ul>
        </div>

        {/* Weaknesses Container */}
        <div className="bg-slate-900 rounded-xl p-6 border border-red-500/20">
          <h2 className="text-xl font-bold text-red-400 mb-4">
            Weaknesses
          </h2>
          <ul className="list-disc ml-5 text-slate-300 space-y-2">
            {resume.analysis?.weaknesses?.length > 0 ? (
              resume.analysis.weaknesses.map((item, index) => (
                <li key={index}>{item}</li>
              ))
            ) : (
              <li className="text-slate-500 list-none">No weaknesses found</li>
            )}
          </ul>
        </div>
      </div>

      {/* Section: Missing Skills */}
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 mb-8">
        <h2 className="text-xl font-bold text-yellow-400 mb-4">
          Missing Skills
        </h2>
        <div className="flex flex-wrap gap-3">
          {resume.analysis?.missingSkills?.length > 0 ? (
            resume.analysis.missingSkills.map((skill, index) => (
              <span
                key={index}
                className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-slate-400">
              No missing skills detected.
            </p>
          )}
        </div>
      </div>

      {/* Section: Recommended Roles */}
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 mb-8">
        <h2 className="text-xl font-bold text-cyan-400 mb-4">
          Recommended Roles
        </h2>
        <div className="flex flex-wrap gap-3">
          {resume.analysis?.recommendedRoles?.length > 0 ? (
            resume.analysis.recommendedRoles.map((role, index) => (
              <span
                key={index}
                className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-3 py-1 rounded-full text-sm font-medium"
              >
                {role}
              </span>
            ))
          ) : (
            <p className="text-slate-400">
              No roles suggested
            </p>
          )}
        </div>
      </div>

      {/* Section: Suggestions */}
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
        <h2 className="text-xl font-bold text-purple-400 mb-4">
          Suggestions
        </h2>
        <ul className="list-disc ml-5 text-slate-300 space-y-2">
          {resume.analysis?.suggestions?.length > 0 ? (
            resume.analysis.suggestions.map((item, index) => (
              <li key={index}>{item}</li>
            ))
          ) : (
            <li className="text-slate-500 list-none">No suggestions available</li>
          )}
        </ul>
      </div>
    </Layout>
  );
}

export default ResumeDetails;