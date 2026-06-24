import React from "react";
import Navbar from "../../components/adminComponents/Navbar";
import Footer from "../../components/adminComponents/Footer";
import { useSelector } from "react-redux";
import useFetchUserData from "../../hooks/useFetchUserData";
import { Navigate, Outlet } from "react-router-dom";
import AdminLoader from "../../utils/AdminLoader";
import Sidebar from "../../components/adminComponents/Sidebar";
import { motion } from "motion/react";

const Home = () => {
  useFetchUserData();

  const { userData, loading, token } = useSelector((state) => state.user);

  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  if (loading) {
    return <AdminLoader />;
  }

  if (!userData) {
    return null;
  }

  return (
    // YouTube Studio base deep black canvas (#0F0F0F)
    <div className="min-h-screen bg-[#0F0F0F] flex flex-col selection:bg-blue-500/30 selection:text-blue-200 antialiased">
      {/* Top Navbar Layer */}
      <Navbar />

      {/* Main Container Wrapper */}
      <div className="flex flex-1 pt-16 relative">
        {/* Collapsible/Responsive Left Sidebar */}
        <Sidebar />

        {/* Dynamic Inner Component Content Layout */}
        {/* Added subtle motion wrap to softly transition core pages as child paths reload */}
        <motion.main
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex-1 min-w-0 p-5 md:p-8 text-[#F1F1F1] bg-[#0F0F0F]"
        >
          <Outlet />
        </motion.main>
      </div>

      {/* Dashboard Footer */}
      <Footer />
    </div>
  );
};

export default Home;
