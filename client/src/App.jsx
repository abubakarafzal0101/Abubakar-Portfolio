import { Route, Routes } from "react-router-dom";
import Login from "./pages/adminPages/Login";
import Home from "./pages/adminPages/Home";
import Register from "./pages/adminPages/Register";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/admin">
          <Route index element={<Home />} />
        </Route>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
