import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full h-12 bg-slate-950 border-t border-slate-900/60 px-4 md:px-8 flex items-center justify-between select-none z-40">
      {/* Left side: Copyright statement */}
      <span className="text-xs font-medium text-slate-500 tracking-wide">
        &copy; {currentYear} Portfolio Admin. All rights reserved.
      </span>

      {/* Right side: System Status Accent Indicator */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          All Systems Operational
        </span>
      </div>
    </footer>
  );
};

export default Footer;
