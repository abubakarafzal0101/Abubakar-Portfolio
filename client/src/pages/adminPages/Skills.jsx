import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import useFetchSkills from "../../hooks/useFetchSkills";
import { useSelector } from "react-redux";
const Skills = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const token = localStorage.getItem("token");
  const { skills } = useSelector((state) => state.user);
  const [skillName, setSkillName] = useState("");
  const [proficiency, setProficiency] = useState(0);
  const [previewImage, setPreviewImage] = useState(
    "https://imgs.search.brave.com/Z7savsikbUJukPd0ntzFdgHqQ8j1Ip9xT8ELTnFOeio/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9maWxl/bWFpbC5iLWNkbi5u/ZXQvY21zL3VwbG9h/ZF9maWxlc18wNTAy/YzM3ZDMyLndlYnA",
  );
  const [loading, setLoading] = useState(false);

  const [skillImage, setSkillImage] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileUrl = URL.createObjectURL(file);
    setSkillImage(file);
    setPreviewImage(fileUrl);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("skillName", skillName);
      formData.append("proficiency", proficiency);
      if (skillImage) {
        formData.append("skillImage", skillImage);
      }
      const response = await axios.post(
        `${serverUrl}/api/skill/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message || "Skill added successfully");
        setSkillName("");
        setProficiency(0);
        setSkillImage(null);
        setPreviewImage(
          "https://imgs.search.brave.com/Z7savsikbUJukPd0ntzFdgHqQ8j1Ip9xT8ELTnFOeio/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9maWxl/bWFpbC5iLWNkbi5u/ZXQvY21zL3VwbG9h/ZF9maWxlc18wNTAy/YzM3ZDMyLndlYnA",
        );
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error, "error in add skill");
    } finally {
      setLoading(false);
    }
  };

  const deleteSkill = async (skillId) => {
    try {
      const response = await axios.delete(
        `${serverUrl}/api/skill/delete/${skillId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message || "Skill deleted successfully");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error, "error in delete skill");
    }
  };

  useFetchSkills();

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <img src={previewImage} alt="" height={"100px"} width={"100px"} />
        <input type="file" onChange={handleFileChange} />

        <input
          type="text"
          placeholder="Skill Name"
          onChange={(e) => setSkillName(e.target.value)}
          value={skillName}
        />
        <input
          type="range"
          name="proficiency"
          id=""
          min="0"
          max="100"
          onChange={(e) => setProficiency(e.target.value)}
        />
        <button type="submit">{loading ? "Adding Skill" : "Add Skill"}</button>
      </form>

      {/*  skills show up */}

      {skills?.map((skill) => (
        <div key={skill._id}>
          <img
            src={skill?.skillImage}
            alt=""
            height={"100px"}
            width={"100px"}
          />
          <h2>{skill?.skillName}</h2>
          <p>{skill?.proficiency}%</p>
          <span onClick={() => deleteSkill(skill._id)}>delete</span>
        </div>
      ))}
    </>
  );
};

export default Skills;
