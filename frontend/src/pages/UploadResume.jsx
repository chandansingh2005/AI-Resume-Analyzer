import React, { useState } from "react";
import Layout from "../components/Layout";
import { UploadCloud } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState("");
  

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
        toast.error("Please select a PDF file");
        return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("PDF must be under 5MB");
        return;
    }

    setFile(selectedFile);
};

  const handleAnalyze = async () => {

    if (!file) {
      toast.error("Please select a resume");
      return;
    }

    try {

      const formData = new FormData();

      formData.append("title", title);
      formData.append("skills", skills);
      formData.append("resume", file);

      const token = localStorage.getItem("token");

      const response = await api.post(
        "/resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );



      toast.success("Resume Uploaded Successfully");

      setTitle("");
      setSkills("");
      setFile(null);

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Upload Failed"
      );
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">
            Upload Your Resume
          </h1>
          <p className="text-slate-400 mt-2">
            Get ATS Score, AI Analysis and Job Recommendations
          </p>
        </div>

        {/* Drag & Drop Upload Zone */}
        <div className="bg-slate-900 border-2 border-dashed border-slate-700 rounded-2xl p-10 text-center hover:border-cyan-500 transition-all duration-300">
          <UploadCloud size={60} className="mx-auto text-cyan-400 mb-4" />

          <h2 className="text-xl font-semibold text-white">
            Drag & Drop Resume
          </h2>
          <p className="text-slate-400 mt-2 text-sm">
            PDF files only (Max 5MB)
          </p>

          <label className="mt-6 inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 hover:opacity-90 active:scale-95 cursor-pointer font-medium text-white transition-all">
            Choose Resume
            <input
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {file && (
            <div className="mt-5 text-emerald-400 text-sm font-medium bg-emerald-950/30 inline-block px-4 py-2 rounded-lg border border-emerald-800/50">
              Selected: {file.name}
            </div>
          )}
        </div>

        {/* Form Details Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-300">
              Resume Title
            </label>
            <input
              type="text"
              placeholder="Frontend Developer Resume"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-300">
              Skills
            </label>
            <input
              type="text"
              placeholder="React, JavaScript, Node.js"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <button
            onClick={handleAnalyze}
            className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 font-semibold text-white hover:scale-[1.01] active:scale-95 transition-all"
          >
            Upload Resume
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default UploadResume;