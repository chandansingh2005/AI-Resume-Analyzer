import { Link } from "react-router-dom";
import Layout from "../components/Layout";

function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">

        <h1 className="text-8xl font-bold text-cyan-400">
          404
        </h1>

        <h2 className="text-3xl font-bold text-white mt-4">
          Page Not Found
        </h2>

        <p className="text-slate-400 mt-4 max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/dashboard"
          className="mt-8 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg text-white font-semibold transition"
        >
          Go to Dashboard
        </Link>

      </div>
    </Layout>
  );
}

export default NotFound;