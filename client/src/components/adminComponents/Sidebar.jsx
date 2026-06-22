import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  FiGrid,
  FiUser,
  FiBriefcase,
  FiFolder,
  FiCpu,
  FiChevronLeft,
  FiChevronRight,
  FiMenu,
  FiX,
} from "react-icons/fi";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: FiGrid },
    { name: "Profile", path: "/admin/profile", icon: FiUser },
    { name: "Experience", path: "/admin/experience", icon: FiBriefcase },
    { name: "Projects", path: "/admin/projects", icon: FiFolder },
    { name: "Skills", path: "/admin/skills", icon: FiCpu },
  ];

  const sidebarVariants = {
    expanded: {
      width: "240px",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    collapsed: {
      width: "70px",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
      isActive
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10"
        : "text-slate-400 hover:text-slate-100 hover:bg-slate-900"
    }`;

  return (
    <>
      {/* --- MOBILE TRIGGER BUTTON --- */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed bottom-6 right-6 z-[99] p-3.5 bg-indigo-600 text-white rounded-full shadow-xl hover:bg-indigo-500 transition-colors focus:outline-none"
      >
        {isMobileOpen ? (
          <FiX className="h-5 w-5" />
        ) : (
          <FiMenu className="h-5 w-5" />
        )}
      </button>

      {/* --- MOBILE SIDEBAR DRAWER (AnimatePresence) --- */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50"
            />
            {/* Drawer Container */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 left-0 bottom-0 w-64 bg-slate-950 border-r border-slate-900 p-4 pt-20 z-50 flex flex-col gap-2"
            >
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin"}
                  onClick={() => setIsMobileOpen(false)}
                  className={navLinkClass}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- DESKTOP SIDEBAR (Collapsible) --- */}
      <motion.div
        animate={isCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        className="hidden md:flex flex-col fixed top-16 left-0 bottom-0 bg-slate-950/40 backdrop-blur-md border-r border-slate-900 p-3 pt-6 z-40 select-none group/sidebar overflow-x-hidden justify-between"
      >
        {/* Navigation Items */}
        <div className="flex flex-col gap-1.5">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={navLinkClass}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="whitespace-nowrap"
                >
                  {item.name}
                </motion.span>
              )}

              {/* Tooltip for collapsed mode */}
              {isCollapsed && (
                <div className="absolute left-14 scale-0 group-hover:scale-100 transition-all rounded bg-slate-900 px-2.5 py-1.5 text-xs font-semibold text-slate-200 shadow-md border border-slate-800 pointer-events-none whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </NavLink>
          ))}
        </div>

        {/* Collapse Toggle Handle Button at the bottom */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2.5 text-slate-500 hover:text-slate-200 hover:bg-slate-900 rounded-xl transition-all border border-transparent hover:border-slate-800 focus:outline-none"
        >
          {isCollapsed ? (
            <FiChevronRight className="h-5 w-5" />
          ) : (
            <FiChevronLeft className="h-5 w-5" />
          )}
        </button>
      </motion.div>

      {/* Invisible spacer component to push layout offset on Desktop */}
      <div
        className={`hidden md:block shrink-0 transition-all duration-300 ${
          isCollapsed ? "w-[70px]" : "w-[240px]"
        }`}
      />
    </>
  );
};

export default Sidebar;
