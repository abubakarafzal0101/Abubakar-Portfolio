import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import useFetchProjects from "../../hooks/useFetchProjects";
import { useSelector } from "react-redux";
import {
  FiFolder,
  FiUploadCloud,
  FiTrash2,
  FiGithub,
  FiExternalLink,
  FiAlignLeft,
} from "react-icons/fi";

const Projects = () => {
  const fetchProjecs = useFetchProjects();
  const [preview, setPreview] = useState(
    "https://imgs.search.brave.com/unm47ot2M2-xGUSwtYn91vns5ToSKXNLB2nYQS8Nf0E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2FudG8uY29tL2Nk/bi8yMDE4LzEyLzE5/MTk1NzQ5L3VwbG9h/ZC1pbWFnZS0zLnBu/Zw",
  );
  const [projectImage, setProjectImage] = useState(null);
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [github, setGithub] = useState("");
  const [live, setLive] = useState("");
  const { projects } = useSelector((state) => state.user);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProjectImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("github", github);
      formData.append("live", live);
      if (projectImage) {
        formData.append("projectImage", projectImage);
      }
      const response = await axios.post(
        `${serverUrl}/api/project/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message || "Project added successfully");
        fetchProjecs();
        setTitle("");
        setDescription("");
        setGithub("");
        setLive("");
        setProjectImage(null);
        setPreview(
          "https://imgs.search.brave.com/unm47ot2M2-xGUSwtYn91vns5ToSKXNLB2nYQS8Nf0E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2FudG8uY29tL2Nk/bi8yMDE4LzEyLzE5/MTk1NzQ5L3VwbG9h/ZC1pbWFnZS0zLnBu/Zw",
        );
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "error in add project");
      toast.error(error?.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const response = await axios.delete(
        `${serverUrl}/api/project/delete/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response?.data?.success) {
        toast.success(
          response?.data?.message || "Project deleted successfully",
        );
        fetchProjecs();
      }
    } catch (error) {
      console.log(error, "error in delete project");
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchProjecs();
  }, [fetchProjecs]);

  return (
    <div className="space-y-6">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#282828] pb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#F1F1F1] tracking-tight flex items-center gap-2">
            <FiFolder className="text-[#3EA6FF] h-5 w-5" />
            Projects Workspace
          </h1>
          <p className="text-xs text-[#AAAAAA] mt-1">
            Deploy, showcase, and manage your portfolio projects efficiently.
          </p>
        </div>
      </div>

      {/* Main Creation Form Surface */}
      <div className="bg-[#1F1F1F] border border-[#282828] rounded-xl overflow-hidden">
        <div className="border-b border-[#282828] bg-[#161616]/60 p-5">
          <h3 className="text-sm font-bold text-[#F1F1F1] uppercase tracking-wider">
            Launch New Project
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Image Upload Area (Rectangular aspect ratio for projects) */}
            <div className="w-full lg:w-1/3">
              <label className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider block mb-2">
                Project Thumbnail
              </label>
              <div className="relative group w-full aspect-video rounded-xl border-2 border-dashed border-[#333333] hover:border-[#3EA6FF] transition-all flex items-center justify-center overflow-hidden bg-[#0F0F0F]">
                <img
                  src={preview}
                  alt="Project preview"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <label className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-all duration-150">
                  <FiUploadCloud className="text-[#F1F1F1] h-8 w-8 mb-2" />
                  <span className="text-xs text-[#F1F1F1] font-bold uppercase tracking-wider">
                    Upload Cover
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Core Details Inputs */}
            <div className="w-full lg:w-2/3 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider block">
                  Project Title
                </label>
                <div className="relative flex items-center">
                  <FiFolder className="absolute left-3.5 text-[#717171] h-4 w-4 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="e.g. Next.js E-Commerce App"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0F0F0F] border border-[#282828] rounded-xl text-sm placeholder:text-[#606060] text-[#F1F1F1] transition-all outline-none focus:border-[#3EA6FF]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider block">
                  Project Description
                </label>
                <div className="relative">
                  <FiAlignLeft className="absolute left-3.5 top-3.5 text-[#717171] h-4 w-4 pointer-events-none" />
                  <textarea
                    name="description"
                    rows="4"
                    placeholder="Explain the architecture, features, and purpose..."
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="w-full pl-10 pr-4 py-3 bg-[#0F0F0F] border border-[#282828] rounded-xl text-sm placeholder:text-[#606060] text-[#F1F1F1] transition-all outline-none focus:border-[#3EA6FF] resize-y"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider block">
                    GitHub Link
                  </label>
                  <div className="relative flex items-center">
                    <FiGithub className="absolute left-3.5 text-[#717171] h-4 w-4 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="github.com/username/repo"
                      onChange={(e) => setGithub(e.target.value)}
                      value={github}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#0F0F0F] border border-[#282828] rounded-xl text-sm placeholder:text-[#606060] text-[#F1F1F1] transition-all outline-none focus:border-[#3EA6FF]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider block">
                    Live Demo Link
                  </label>
                  <div className="relative flex items-center">
                    <FiExternalLink className="absolute left-3.5 text-[#717171] h-4 w-4 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="https://your-project.vercel.app"
                      onChange={(e) => setLive(e.target.value)}
                      value={live}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#0F0F0F] border border-[#282828] rounded-xl text-sm placeholder:text-[#606060] text-[#F1F1F1] transition-all outline-none focus:border-[#3EA6FF]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Action Button */}
          <div className="pt-2 flex justify-end border-t border-[#282828] mt-6 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-8 flex items-center justify-center gap-2 bg-[#3EA6FF] hover:bg-[#65B8FF] disabled:bg-[#3EA6FF]/20 disabled:text-[#AAAAAA]/50 disabled:cursor-not-allowed text-[#0F0F0F] text-sm font-semibold h-11 rounded-lg transition-colors cursor-pointer focus:outline-none"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-[#0F0F0F]/30 border-t-[#0F0F0F] rounded-full animate-spin" />
              ) : (
                <span>Publish Project</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Projects Grid Display Section */}
      <div className="pt-4">
        <h3 className="text-sm font-bold text-[#F1F1F1] uppercase tracking-wider mb-5">
          Active Projects Portfolio
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project) => (
            <div
              key={project?._id}
              className="bg-[#1F1F1F] border border-[#282828] rounded-xl overflow-hidden flex flex-col group transition-all hover:border-[#3EA6FF]/50 hover:bg-[#252525]"
            >
              {/* Project Image Card */}
              <div className="h-48 w-full bg-[#0F0F0F] border-b border-[#282828] overflow-hidden relative">
                <img
                  src={project?.projectImage}
                  alt={project?.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Project Details */}
              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-lg font-semibold text-[#F1F1F1] line-clamp-1">
                  {project?.title}
                </h2>
                <p className="text-sm text-[#AAAAAA] mt-2 line-clamp-3 flex-1">
                  {project?.description}
                </p>

                {/* Links Layout */}
                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#AAAAAA] bg-[#0F0F0F] px-3 py-1.5 rounded border border-[#282828] truncate">
                    <FiGithub className="shrink-0 text-[#3EA6FF]" />
                    <span className="truncate">
                      {project?.github || "No repository linked"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#AAAAAA] bg-[#0F0F0F] px-3 py-1.5 rounded border border-[#282828] truncate">
                    <FiExternalLink className="shrink-0 text-[#3EA6FF]" />
                    <span className="truncate">
                      {project?.live || "No live link available"}
                    </span>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="mt-5 pt-4 border-t border-[#282828] flex justify-end">
                  <button
                    onClick={() => handleDeleteProject(project?._id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-[#AAAAAA] uppercase tracking-wider rounded-lg hover:text-[#FF4E4E] hover:bg-[#FF4E4E]/10 transition-colors cursor-pointer focus:outline-none"
                  >
                    <FiTrash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
