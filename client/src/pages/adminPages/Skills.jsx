import React, { useEffect, useState } from "react";
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
  const fetchSkills = useFetchSkills();
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
        fetchSkills();
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
        fetchSkills();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error, "error in delete skill");
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto text-[#F1F1F1] select-none p-1">
      {/* Workspace Sub Header Group */}
      <div className="border-b border-[#282828] pb-4">
        <h1 className="text-xl font-semibold tracking-tight text-[#F1F1F1]">
          Skills Workspace
        </h1>
        <p className="text-xs text-[#AAAAAA] mt-1">
          Add new technologies or manage your existing stack assets.
        </p>
      </div>

      {/* Main Panel Input Surface */}
      <div className="bg-[#1F1F1F] border border-[#282828] rounded-xl p-6 md:p-8">
        <form onSubmit={onSubmitHandler} className="space-y-6">
          {/* File Upload & Avatar Section Layout */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 border-b border-[#282828]/50 pb-6">
            <img
              src={previewImage}
              alt=""
              className="w-20 h-20 object-cover rounded-xl border border-[#282828] bg-[#0F0F0F] shadow-inner shrink-0"
            />
            <div className="space-y-1.5 w-full">
              <label className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider block">
                Skill Icon/Image
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="block w-full text-xs text-[#AAAAAA] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#282828] file:text-[#F1F1F1] hover:file:bg-[#333333] file:cursor-pointer transition-colors"
              />
            </div>
          </div>

          {/* Form Input Stack Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Text Input Block */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider block">
                Skill Name
              </label>
              <input
                type="text"
                placeholder="Skill Name"
                onChange={(e) => setSkillName(e.target.value)}
                value={skillName}
                className="w-full px-4 py-2.5 bg-[#0F0F0F] border border-[#282828] rounded-xl text-sm placeholder:text-[#606060] text-[#F1F1F1] transition-all outline-none focus:border-[#3EA6FF]"
              />
            </div>

            {/* Range Slider Configuration Block */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider">
                  Proficiency Level
                </label>
                <span className="text-xs font-mono font-bold text-[#3EA6FF] bg-[#3EA6FF]/10 px-2 py-0.5 rounded border border-[#3EA6FF]/20">
                  {proficiency}%
                </span>
              </div>
              <div className="pt-3">
                <input
                  type="range"
                  name="proficiency"
                  min="0"
                  max="100"
                  value={proficiency}
                  onChange={(e) => setProficiency(e.target.value)}
                  className="w-full h-1.5 bg-[#0F0F0F] rounded-lg cursor-pointer appearance-none accent-[#3EA6FF]"
                />
              </div>
            </div>
          </div>

          {/* Core Creation Action Button Trigger */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-6 h-10 bg-[#3EA6FF] hover:bg-[#65B8FF] disabled:bg-[#3EA6FF]/20 disabled:text-[#AAAAAA]/50 disabled:cursor-not-allowed text-[#0F0F0F] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer outline-none"
            >
              {loading ? "Adding Skill" : "Add Skill"}
            </button>
          </div>
        </form>
      </div>

      {/* Header Separation for Skills Collection Grid */}
      <div className="pt-4">
        <h3 className="text-xs font-bold text-[#AAAAAA] uppercase tracking-widest mb-4">
          Active Technical Matrix
        </h3>

        {/* Responsive Flex/Grid Dashboard Matrix View */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skills?.map((skill) => (
            <div
              key={skill._id}
              className="bg-[#1F1F1F] border border-[#282828] rounded-xl p-4 flex flex-col items-center justify-between text-center min-h-[190px] group transition-all duration-150 hover:border-[#333333]"
            >
              <img
                src={skill?.skillImage}
                alt=""
                className="w-14 h-14 object-contain p-1.5 rounded-xl bg-[#0F0F0F] border border-[#282828]/50 shadow-inner"
              />
              <div className="mt-3 w-full">
                <h2 className="text-sm font-semibold text-[#F1F1F1] truncate px-1">
                  {skill?.skillName}
                </h2>
                <p className="text-xs font-mono font-bold text-[#3EA6FF] mt-0.5">
                  {skill?.proficiency}%
                </p>
              </div>

              {/* Styled clean destructive button text wrapper */}
              <span
                onClick={() => deleteSkill(skill?._id)}
                className="mt-4 px-2 py-1.5 text-[10px] font-bold text-[#AAAAAA] uppercase tracking-wider bg-[#0F0F0F] border border-[#282828] rounded-md hover:text-[#FF4E4E] hover:bg-[#FF4E4E]/10 hover:border-[#FF4E4E]/20 transition-all cursor-pointer block w-full text-center"
              >
                delete
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
