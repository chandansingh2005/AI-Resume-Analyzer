import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LayoutDashboard, Upload, LogOut, } from "lucide-react";

import { useAuth } from "../context/AuthContext";


function Navbar() {
    const [open, setOpen] = useState(false);
    const { isAuthenticated } = useAuth();
    console.log(isAuthenticated);

    return (
        <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur border-b border-slate-800">


            <div className="max-w-7xl mx-auto px-4">

                <div className="flex items-center justify-between h-16">

                    {/* Logo */}

                    <Link
                        to="/dashboard"
                        className="flex items-center gap-3">
                        <div className="w-10 h-1 rounded-xl 
                    bg-gradient-to-r
                     from-cyan-500
                      to-violet-500 
                      flex items-center 
                      justify-center font-bold  text-white "
                        >
                        </div>

                        <div>
                            <h1 className="font-bold text-xl">
                                AI Resume
                                <span className="text-cyan-400">Analyser</span>
                            </h1>
                        </div>
                    </Link>

                    {/* Desktop Menu */}

                    <div className="hidden md:flex items-center gap-8">

                        <Link
                            to="/dashboard"
                            className="hover:text-cyan-400 transition"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/upload"
                            className="hover:text-cyan-400 transition"
                        >
                            Upload Resume
                        </Link>

                        <button
                            className="px-4 py-2
                                   rounded-lg
                                   bg-gradient-to-r
                                   from-cyan-500
                                   to-violet-500
                                   hover:scale-105
                                   transition ">
                            Logout
                        </button>

                    </div>

                    {/* Mobile Button */}

                    <button
                        className="md:hidden"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <X /> : <Menu />}
                    </button>

                </div>

                {/* Mobile Menu */}

                {open && (
                    <div className="md:hidden border-t border-slate-800 py-4">

                        <div className="flex flex-col gap-4">

                            <Link
                                to="/dashboard"
                                className="flex items-center gap-2"
                            >
                                <LayoutDashboard size={18} />
                                Dashboard
                            </Link>

                            <Link
                                to="/upload"
                                className="flex items-center gap-2"
                            >
                                <Upload size={18} />
                                Upload Resume
                            </Link>

                            <button className="flex items-center gap-2 text-red-400">
                                <LogOut size={18} />
                                Logout
                            </button>

                        </div>

                    </div>
                )}

            </div>
        </nav>


    );
}

export default Navbar;
