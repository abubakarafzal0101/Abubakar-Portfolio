import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { setToken } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerUserHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${serverUrl}/api/auth/register`, {
        name,
        email,
        password,
      });
      if (response?.data?.success) {
        dispatch(setToken(response?.data?.token));
        localStorage.setItem("token", response?.data?.token);
        navigate("/admin");
        toast.success(
          response?.data?.message || "User registered successfully",
        );
      }
    } catch (error) {
      console.log(error, "error in Register User");
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const { token } = useSelector((state) => state.user);

  if (token) {
    return <Navigate to="/admin" />;
  }
  return (
    <div className="min-h-screen w-screen bg-slate-50/50 flex flex-col items-center justify-center p-4 selection:bg-slate-900 selection:text-white">
      {/* Auth Card Container */}
      <div className="w-full max-w-[440px] bg-white border border-slate-200/80 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300">
        {/* Header Block */}
        <div className="flex flex-col mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Create an account
          </h2>
          <p className="text-sm text-slate-500 mt-1.5">
            Enter your details below to get started with your admin panel.
          </p>
        </div>

        {/* Form Element */}
        <form onSubmit={registerUserHandler} className="space-y-5">
          {/* Full Name Input Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-600 tracking-wide uppercase">
              Full Name
            </label>
            <div className="relative flex items-center">
              <FiUser className="absolute left-3.5 text-slate-400 h-4 w-4 pointer-events-none" />
              <input
                type="text"
                required
                placeholder="John Doe"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 text-slate-800 transition-all duration-200 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5"
              />
            </div>
          </div>

          {/* Email Input Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-600 tracking-wide uppercase">
              Email Address
            </label>
            <div className="relative flex items-center">
              <FiMail className="absolute left-3.5 text-slate-400 h-4 w-4 pointer-events-none" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 text-slate-800 transition-all duration-200 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5"
              />
            </div>
          </div>

          {/* Password Input Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-600 tracking-wide uppercase">
              Password
            </label>
            <div className="relative flex items-center">
              <FiLock className="absolute left-3.5 text-slate-400 h-4 w-4 pointer-events-none" />
              <input
                type="password"
                required
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 text-slate-800 transition-all duration-200 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5"
              />
            </div>
          </div>

          {/* Action Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-800/80 disabled:cursor-not-allowed text-white text-sm font-medium h-11 rounded-xl transition-all duration-200 cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20"
          >
            {loading ? (
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Register Now</span>
                <FiArrowRight className="h-4 w-4 text-white/80" />
              </>
            )}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            Already have an account?{" "}
            <Link
              to="/admin/login"
              className="font-medium text-slate-900 hover:underline underline-offset-4 transition-all"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
