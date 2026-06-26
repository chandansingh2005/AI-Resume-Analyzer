import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";
import toast from "react-hot-toast";
import {
    User,
    Mail,
    FileText,
    Award,
    Trophy,
    Calendar,
} from "lucide-react";

function Profile() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await api.get("/user/profile");
            setProfile(response.data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load profile");
        }
    };

    if (!profile) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-[70vh]">
                    <h2 className="text-white text-2xl animate-pulse">
                        Loading Profile...
                    </h2>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-5xl mx-auto">

                <h1 className="text-4xl font-bold text-white mb-8">
                    My Profile
                </h1>

                {/* User Info */}

                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 mb-8">

                    <div className="flex items-center gap-5">

                        <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center">
                            <User size={38} className="text-white" />
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-white">
                                {profile.user.name}
                            </h2>

                            <p className="text-slate-400 flex items-center gap-2 mt-2">
                                <Mail size={16} />
                                {profile.user.email}
                            </p>
                        </div>

                    </div>

                </div>

                {/* Stats */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

                        <div className="flex items-center gap-3 mb-2">

                            <FileText className="text-cyan-400" />

                            <p className="text-slate-400">
                                Total Resumes
                            </p>

                        </div>

                        <h2 className="text-4xl font-bold text-white">
                            {profile.totalResumes}
                        </h2>

                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

                        <div className="flex items-center gap-3 mb-2">

                            <Award className="text-green-400" />

                            <p className="text-slate-400">
                                Average ATS Score
                            </p>

                        </div>

                        <h2 className="text-4xl font-bold text-green-400">
                            {profile.averageATS}%
                        </h2>

                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

                        <div className="flex items-center gap-3 mb-2">

                            <Trophy className="text-yellow-400" />

                            <p className="text-slate-400">
                                Best ATS Score
                            </p>

                        </div>

                        <h2 className="text-4xl font-bold text-yellow-400">
                            {profile.bestATS}%
                        </h2>

                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

                        <div className="flex items-center gap-3 mb-2">

                            <Calendar className="text-violet-400" />

                            <p className="text-slate-400">
                                Member Since
                            </p>

                        </div>

                        <h2 className="text-xl font-semibold text-white">
                            {new Date(profile.user.createdAt).toLocaleDateString()}
                        </h2>

                    </div>

                </div>

            </div>
        </Layout>
    );
}

export default Profile;