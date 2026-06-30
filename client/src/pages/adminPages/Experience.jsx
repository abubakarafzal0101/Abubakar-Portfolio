import React, { useState } from "react";
import { toast } from "react-hot-toast";
const Experience = () => {
  const token = localStorage.getItem("token");
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
    } catch (error) {
      console.log(error, "error in addExperience");
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Enter Comany Name"
          name="company"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Position"
          name="position"
          onChange={handleChange}
        />
        <textarea
          name="description"
          id=""
          placeholder="Description"
          name="description"
          onChange={handleChange}
        ></textarea>
        <input
          type="date"
          placeholder="Start Date"
          name="startDate"
          onChange={handleChange}
        />
        <input
          type="date"
          placeholder="end Date"
          name="endDate"
          onChange={handleChange}
        />
        <button type="submit">SUbmit</button>
      </form>
    </>
  );
};

export default Experience;
