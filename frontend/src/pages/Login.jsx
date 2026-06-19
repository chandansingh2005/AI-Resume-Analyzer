import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../api/axios"
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password
      });
      login(response.data.token);
      alert("Login Successfully");
      toast.success("Login Successful");
      navigate("/dashboard");

    } catch (error) {
      toast.error("Invalid Email or Password");
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server Not Running");
      }

    }

    // API call here later
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-[#0B1120] border border-gray-800 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          AI Resume Analyzer
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Login to continue
        </p>
        <p className="text-center text-gray-400 text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-cyan-400 underline hover:underline font-medium ml-1">
            Sign up
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-gray-200 text-sm">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
              required
            />
          </div>

          <div>
            <label className="text-gray-200 text-sm">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;