import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from './pages/Dashboard';
import UploadResume from './pages/UploadResume';
import ProtectedRoute from "./components/ProtectedRoute";
import { Upload } from "lucide-react";
import MyResumes from './pages/MyResumes'
import ResumeDetails from './pages/ResumeDetails'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>} />

                <Route path="/upload" element={
                    <ProtectedRoute>
                        <UploadResume />
                    </ProtectedRoute>
                }
                />
                <Route path="/my-resumes" element={
                    <ProtectedRoute>
                        <MyResumes />
                    </ProtectedRoute>
                }
                />
                <Route path="/resume/:id" element={
                    <ProtectedRoute>
                        <ResumeDetails />
                    </ProtectedRoute>
                }
                />

            </Routes>

        </BrowserRouter>
    )
}

export default App
