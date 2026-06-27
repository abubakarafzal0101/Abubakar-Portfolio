import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Skills = () => {
  const [previewImage, setPreviewImage] = useState(
    "https://imgs.search.brave.com/TiVH6uLgl3DM0z-QQHpPPx2BFW3Kua8Cc-mQzPCa93Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vdmlk/ZW9zL3RodW1ibmFp/bHMvb3JpZ2luYWxz/LzhmLzQ0LzExLzhm/NDQxMTEwN2VhZjAx/MjYxODZlYTE4OTFl/Yjg4YjIzLjAwMDAw/MDAuanBn",
  );
  const [skillImage, setSkillImage] = useState(null);
  const [skillLevel, setSkillLevel] = useState(0);
  const [skillName, setSkillName] = useState("");
  const [loading, setLoading] = useState(false);
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setSkillImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((!skillName, !skillLevel)) {
      toast.error("Please fill all the fields");
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("skillName", skillName);
      formData.append("skillLevel", skillLevel);
      if (!skillImage) {
        toast.error("Please upload a file");
      }
      formData.append("skillImage", skillImage);
      const response = await axios.post(
        `${serverUrl}/api/skill/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message || "Skill added successfully");
      }
      setLoading(false);
    } catch (error) {
      console.log(error, "error in add skill");
      toast.error(error?.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <img
          src={previewImage}
          alt="skill-image"
          height={"100px"}
          width={"100px"}
        />
        <input type="file" onChange={handleFileChange} />

        <input
          type="text"
          placeholder="Skill Name"
          onChange={(e) => setSkillName(e.target.value)}
          value={skillName}
        />
        <input
          type="range"
          name="skillLevel"
          min="0"
          max="100"
          id=""
          onChange={(e) => setSkillLevel(e.target.value)}
        />
        <button type="submit">{loading ? "Adding Skill" : "Add Skill"}</button>
      </form>
    </>
  );
};

export default Skills;
