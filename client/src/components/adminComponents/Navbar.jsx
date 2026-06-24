import React from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/slices/userSlice";
import { FiLogOut, FiLayout } from "react-icons/fi";

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setToken(null));
    window.location.reload();
  };

  return (
    // Solid background with sharp border matching the studio aesthetic
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#1F1F1F] border-b border-[#333333] px-4 md:px-8 flex items-center justify-between transition-all duration-200">
      {/* Left Section: Branding */}
      <div className="flex items-center gap-3">
        {/* Swapped neon-indigo for a clean, professional dark studio accent */}
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF0000]/10 border border-[#FF0000]/20 text-[#FF0000]">
          <FiLayout className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm tracking-tight text-[#F1F1F1]">
            Portfolio
          </span>
          <span className="text-[11px] font-bold text-[#AAAAAA] uppercase tracking-wider">
            Admin Panel
          </span>
        </div>
      </div>

      {/* Right Section: Actions & Profile */}
      <div className="flex items-center gap-4">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#333333] text-sm font-medium text-[#F1F1F1] hover:text-[#FF4E4E] hover:bg-[#FF4E4E]/10 hover:border-[#FF4E4E]/30 transition-all duration-200 cursor-pointer focus:outline-none"
        >
          <FiLogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
