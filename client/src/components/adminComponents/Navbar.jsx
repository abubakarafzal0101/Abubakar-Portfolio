import React from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/slices/userSlice";
import { FiLogOut, FiLayout, FiUser } from "react-icons/fi";

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setToken(null));
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-slate-100 px-4 md:px-8 flex items-center justify-between backdrop-blur-md bg-white/90">
      {/* Left Section: Branding */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
          <FiLayout className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm tracking-tight text-slate-900">
            Portfolio
          </span>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Admin Panel
          </span>
        </div>
      </div>

      {/* Right Section: Actions & Profile */}
      <div className="flex items-center gap-4">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50/50 hover:border-red-200 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500/20"
        >
          <FiLogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
