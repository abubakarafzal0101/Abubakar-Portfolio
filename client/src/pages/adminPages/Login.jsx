import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { setToken } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginUserHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${serverUrl}/api/auth/login`, {
        email,
        password,
      });
      if (response?.data?.success) {
        dispatch(setToken(response?.data?.token));
        localStorage.setItem("token", response?.data?.token);
        navigate("/admin");
        toast.success(response?.data?.message || "Logged in successfully");
      }
    } catch (error) {
      console.log(error, "error in Login User");
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Cyberpunk Grid effect (Optional SaaS detail) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Auth Card Container */}
      <div className="w-full max-w-[440px] bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-300 z-10">
        {/* Header Block */}
        <div className="flex flex-col mb-8">
          <div className="h-9 w-9 mb-4 flex items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <FiLogIn className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-100">
            Welcome back
          </h2>
          <p className="text-sm text-slate-400 mt-1.5">
            Enter your credentials to access the admin workspace.
          </p>
        </div>

        {/* Form Element */}
        <form onSubmit={loginUserHandler} className="space-y-5">
          {/* Email Input Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
              Email Address
            </label>
            <div className="relative flex items-center">
              <FiMail className="absolute left-3.5 text-slate-500 h-4 w-4 pointer-events-none" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm placeholder:text-slate-600 text-slate-200 transition-all duration-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
          </div>

          {/* Password Input Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
              Password
            </label>
            <div className="relative flex items-center">
              <FiLock className="absolute left-3.5 text-slate-500 h-4 w-4 pointer-events-none" />
              <input
                type="password"
                required
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm placeholder:text-slate-600 text-slate-200 transition-all duration-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
          </div>

          {/* Action Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:text-indigo-200/50 disabled:cursor-not-allowed text-white text-sm font-medium h-11 rounded-xl transition-all duration-200 cursor-pointer shadow-lg shadow-indigo-500/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          >
            {loading ? (
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="mt-6 text-center border-t border-slate-800/60 pt-5">
          <p className="text-xs text-slate-400">
            Don't have an account yet?{" "}
            <Link
              to="/admin/register"
              className="font-medium text-indigo-400 hover:text-indigo-300 hover:underline underline-offset-4 transition-all"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
