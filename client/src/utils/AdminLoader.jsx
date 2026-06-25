import React, { useEffect } from "react";
import { motion } from "motion/react";

const AdminLoader = () => {
  // Prevent scrolling when loader is active
  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Clean up function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0F0F0F] text-[#F1F1F1] selection:bg-transparent">
      {/* Background subtle glow effect - Swapped to low opacity Studio Blue */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#3EA6FF]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Interactive Loader Graphic */}
      <div className="relative flex items-center justify-center h-24 w-24">
        {/* Outer Pulsing & Rotating Ring */}
        <motion.div
          animate={{
            rotate: 360,
            borderRadius: [
              "30% 70% 70% 30% / 30% 30% 70% 70%",
              "50% 50% 50% 50%",
            ],
          }}
          transition={{
            rotate: { duration: 2.5, repeat: Infinity, ease: "linear" },
            borderRadius: {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
          className="absolute inset-0 border-2 border-dashed border-[#333333]"
        />

        {/* Inner Solid Spinning Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute h-14 w-14 rounded-full border-2 border-t-[#3EA6FF] border-r-transparent border-b-transparent border-l-transparent"
        />

        {/* Center Static Core Accent */}
        <motion.div
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-4 w-4 bg-[#3EA6FF] rounded-full shadow-[0_0_15px_rgba(62,166,255,0.4)]"
        />
      </div>

      {/* Interactive Typography */}
      <div className="mt-8 flex flex-col items-center gap-1.5 z-10">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-sm font-semibold tracking-wider uppercase text-[#F1F1F1]"
        >
          Loading Workspace
        </motion.h3>

        {/* Animated Dot Subtext */}
        <div className="flex items-center gap-1 text-xs text-[#AAAAAA] font-medium tracking-wide">
          <span>Preparing dashboard</span>
          <div className="flex gap-0.5 ml-0.5">
            {[0, 1, 2].map((index) => (
              <motion.span
                key={index}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut",
                }}
                className="text-[#3EA6FF] font-bold"
              >
                .
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoader;
