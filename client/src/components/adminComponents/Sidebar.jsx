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
      transition: { duration: 0.25, ease: "easeInOut" },
    },
    collapsed: {
      width: "72px",
      transition: { duration: 0.25, ease: "easeInOut" },
    },
  };

  return (
    <>
      {/* --- MOBILE TRIGGER BUTTON (Studio Style FAB) --- */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed bottom-6 right-6 z-[99] h-12 w-12 bg-[#FF0000] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#E60000] transition-colors focus:outline-none"
      >
        {isMobileOpen ? (
          <FiX className="h-5 w-5" />
        ) : (
          <FiMenu className="h-5 w-5" />
        )}
      </button>

      {/* --- MOBILE SIDEBAR DRAWER --- */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Matte Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden fixed inset-0 bg-black/50 z-50"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="md:hidden fixed top-0 left-0 bottom-0 w-64 bg-[#1F1F1F] border-r border-[#333333] p-3 pt-20 z-50 flex flex-col gap-1"
            >
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin"}
                  onClick={() => setIsMobileOpen(false)}
                  className="no-underline"
                >
                  {({ isActive }) => (
                    <div
                      className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium relative transition-colors duration-200 ${
                        isActive
                          ? "bg-[#333333] text-[#F1F1F1]"
                          : "text-[#AAAAAA] hover:bg-[#282828] hover:text-[#F1F1F1]"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#FF0000] rounded-r-full" />
                      )}
                      <item.icon className="h-5 w-5 shrink-0" />
                      <span>{item.name}</span>
                    </div>
                  )}
                </NavLink>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- DESKTOP SIDEBAR (YouTube Studio Solid Alignment) --- */}
      <motion.div
        animate={isCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        // Background matches Studio's canvas structure seamlessly
        className="hidden md:flex flex-col fixed top-16 left-0 bottom-0 bg-[#0F0F0F] border-r border-[#282828] p-2 pt-3 z-40 select-none overflow-x-hidden justify-between"
      >
        {/* Navigation Item Stack */}
        <div className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className="no-underline relative group/item"
            >
              {({ isActive }) => (
                <div
                  className={`flex items-center gap-5 px-4 py-3 rounded-xl text-sm font-medium relative transition-colors duration-150 ${
                    isActive
                      ? "text-[#F1F1F1] bg-[#282828]"
                      : "text-[#AAAAAA] hover:bg-[#1F1F1F] hover:text-[#F1F1F1]"
                  }`}
                >
                  {/* Premium Sliding Left Active Marker */}
                  {isActive && (
                    <motion.div
                      layoutId="sidebarActiveIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#FF0000] rounded-r-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  <item.icon className="h-5 w-5 shrink-0" />

                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="whitespace-nowrap tracking-wide text-[13.5px]"
                    >
                      {item.name}
                    </motion.span>
                  )}

                  {/* Clean Studio Tooltip for Collapsed Mode */}
                  {isCollapsed && (
                    <div className="absolute left-16 scale-0 group-hover/item:scale-100 opacity-0 group-hover/item:opacity-100 transition-all duration-150 rounded bg-[#616161] px-2.5 py-1.5 text-xs font-normal text-[#FFFFFF] shadow-xl pointer-events-none whitespace-nowrap z-50">
                      {item.name}
                    </div>
                  )}
                </div>
              )}
            </NavLink>
          ))}
        </div>

        {/* Bottom Expand/Collapse Handle Action */}
        <div className="p-1 border-t border-[#282828]/50 pt-2">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center h-10 text-[#AAAAAA] hover:text-[#F1F1F1] hover:bg-[#1F1F1F] rounded-xl transition-colors cursor-pointer focus:outline-none"
          >
            {isCollapsed ? (
              <FiChevronRight className="h-5 w-5" />
            ) : (
              <FiChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Invisible Width Offset Spacer Container to secure Grid stability */}
      <div
        className={`hidden md:block shrink-0 transition-all duration-250 ease-in-out ${
          isCollapsed ? "w-[72px]" : "w-[240px]"
        }`}
      />
    </>
  );
};

export default Sidebar;
