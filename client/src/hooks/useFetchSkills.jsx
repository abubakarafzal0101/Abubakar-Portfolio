import React, { useCallback, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSkills } from "../redux/slices/userSlice.js";
const useFetchSkills = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  const fetchSkills = useCallback(async () => {
    const response = await axios.get(`${serverUrl}/api/skill/get-all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response?.data?.success) {
      console.log(response?.data?.skills);
      dispatch(setSkills(response?.data?.skills));
    }
  }, [serverUrl, token, dispatch]);

  return fetchSkills;
};

export default useFetchSkills;
