import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from './pages/Dashboard';
import UploadResume from './pages/UploadResume';
import ProtectedRoute from "./components/ProtectedRoute";
import { Upload } from "lucide-react";

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
                        <Upload />
                    </ProtectedRoute>
                }
                />

            </Routes>

        </BrowserRouter>
    )
}

export default App
