import Navbar from "../../components/adminComponents/Navbar";
import Footer from "../../components/adminComponents/Footer";
import { useSelector } from "react-redux";
import useFetchUserData from "../../hooks/useFetchUserData";
import { Navigate } from "react-router-dom";
const Home = () => {
  useFetchUserData();

  const { userData, loading, token } = useSelector((state) => state.user);

  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!userData) {
    return null;
  }
  return (
    <>
      <Navbar />
      <h1 className="mt-50">{userData?.name}</h1>
      <Footer />
    </>
  );
};

export default Home;
