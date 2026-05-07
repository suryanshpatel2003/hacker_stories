import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Zap, User, Mail, Lock, ArrowRight } from "lucide-react";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      console.error("Registration failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center font-sans p-6">
      
      {/* ⚡ LOGO SECTION */}
      <div className="mb-10 flex flex-col items-center">
        <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4 shadow-xl">
          <Zap size={24} className="text-white fill-current" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Join HackerPulse</h1>
      </div>

      {/* ⚪ MINIMAL REGISTER CARD */}
      <div className="w-full max-w-[380px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Name Field */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-900 transition-colors">
              <User size={18} />
            </div>
            <input
              type="text"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 pl-12 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 transition-all outline-none"
              placeholder="Full name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Email Field */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-900 transition-colors">
              <Mail size={18} />
            </div>
            <input
              type="email"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 pl-12 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 transition-all outline-none"
              placeholder="Email address"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Password Field */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-900 transition-colors">
              <Lock size={18} />
            </div>
            <input
              type="password"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 pl-12 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 transition-all outline-none"
              placeholder="Create password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition-all active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-slate-200"
          >
            {loading ? "Creating account..." : "Get Started"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        {/* 🖊️ LOGIN LINK */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            Already a member?{" "}
            <Link to="/login" className="text-slate-900 font-bold hover:underline decoration-2 underline-offset-4">
              Log in
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Register;