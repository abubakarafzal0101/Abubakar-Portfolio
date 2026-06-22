import React from "react";
import Navbar from "../../components/adminComponents/Navbar";
import Footer from "../../components/adminComponents/Footer";
import { useSelector } from "react-redux";
import useFetchUserData from "../../hooks/useFetchUserData";
import { Navigate, Outlet } from "react-router-dom";
import AdminLoader from "../../utils/AdminLoader";
import Sidebar from "../../components/adminComponents/Sidebar";

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
    <div className="min-h-screen bg-slate-950 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar Layer */}
      <Navbar />

      {/* Main Container Wrapper */}
      <div className="flex flex-1 pt-16 relative">
        {/* Collapsible/Responsive Left Sidebar */}
        <Sidebar />

        {/* Dynamic Inner Component Content Layout */}
        <main className="flex-1 min-w-0 p-4 md:p-8 text-slate-100 bg-slate-950/20">
          <Outlet />
        </main>
      </div>

      {/* Dashboard Footer (Will stay aligned nicely) */}
      <Footer />
    </div>
  );
};

export default Home;
