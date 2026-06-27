import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setSkills } from "../redux/slices/userSlice.js";
const useFetchSkills = () => {
  const token = localStorage.getItem("token");
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const dispatch = useDispatch();

  const fetchSkills = useCallback(async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/skill/get-skills-admin`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response?.data?.success) {
        dispatch(setSkills(response?.data?.skills));
        console.log(response?.data?.skills);
      }
    } catch (error) {
      console.log(error, "error in useFetchSkills");
    }
  }, [serverUrl, token, dispatch]);
  return fetchSkills;
};

export default useFetchSkills;
