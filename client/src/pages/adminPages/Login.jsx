import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { setToken } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { motion } from "motion/react";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";

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

  // Cohesive animation configurations
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen w-screen bg-[#0F0F0F] flex flex-col items-center justify-center p-4 selection:bg-blue-500/30 selection:text-blue-200">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[420px] bg-[#1F1F1F] border border-[#333333] rounded-2xl p-8 shadow-2xl"
      >
        {/* Header Block */}
        <motion.div variants={itemVariants} className="mb-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Welcome back
          </h2>
          <p className="text-sm text-[#AAAAAA] mt-2">
            Enter your credentials to access the admin workspace.
          </p>
        </motion.div>

        {/* Form Element */}
        <form onSubmit={loginUserHandler} className="space-y-5">
          {/* Email Input Field */}
          <motion.div variants={itemVariants} className="space-y-1.5">
            <label className="text-[13px] font-medium text-[#AAAAAA] ml-1">
              Email Address
            </label>
            <div className="relative flex items-center">
              <FiMail className="absolute left-3.5 text-[#717171] h-4 w-4 pointer-events-none" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full pl-10 pr-4 py-2.5 bg-[#0F0F0F] border border-[#333333] rounded-xl text-sm placeholder:text-[#555555] text-[#F1F1F1] transition-all duration-200 outline-none hover:border-[#444444] focus:border-[#3EA6FF] focus:bg-[#121212]"
              />
            </div>
          </motion.div>

          {/* Password Input Field */}
          <motion.div variants={itemVariants} className="space-y-1.5">
            <label className="text-[13px] font-medium text-[#AAAAAA] ml-1">
              Password
            </label>
            <div className="relative flex items-center">
              <FiLock className="absolute left-3.5 text-[#717171] h-4 w-4 pointer-events-none" />
              <input
                type="password"
                required
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full pl-10 pr-4 py-2.5 bg-[#0F0F0F] border border-[#333333] rounded-xl text-sm placeholder:text-[#555555] text-[#F1F1F1] transition-all duration-200 outline-none hover:border-[#444444] focus:border-[#3EA6FF] focus:bg-[#121212]"
              />
            </div>
          </motion.div>

          {/* Action Submit Button */}
          <motion.div variants={itemVariants} className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#3EA6FF] hover:bg-[#65B8FF] text-[#0F0F0F] disabled:bg-[#3EA6FF]/50 disabled:text-[#0F0F0F]/50 disabled:cursor-not-allowed text-sm font-semibold h-11 rounded-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3EA6FF]/40"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-[#0F0F0F]/30 border-t-[#0F0F0F] rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <FiArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </motion.div>
        </form>

        {/* Footer Navigation */}
        <motion.div variants={itemVariants} className="mt-8 text-center">
          <p className="text-[13px] text-[#AAAAAA]">
            Don't have an account yet?{" "}
            <Link
              to="/admin/register"
              className="font-semibold text-[#3EA6FF] hover:text-[#65B8FF] transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
