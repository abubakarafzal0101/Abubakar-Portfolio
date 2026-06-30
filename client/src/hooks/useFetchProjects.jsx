import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setProjects } from "../redux/slices/userSlice.js";
const useFetchProjects = () => {
  const token = localStorage.getItem("token");
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const dispatch = useDispatch();

  const fetchProjects = useCallback(async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/project/get-admin-projects`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response?.data?.success) {
        dispatch(setProjects(response?.data?.projects));
        console.log(response?.data?.projects);
      }
    } catch (error) {
      console.log(error, "error in useFetchProjects");
    }
  }, [serverUrl, token, dispatch]);
  return fetchProjects;
};

export default useFetchProjects;
