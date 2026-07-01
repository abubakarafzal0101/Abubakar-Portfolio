import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import useFetchEducation from "../../hooks/useFetchEducation";
import { useSelector } from "react-redux";
import moment from "moment";
import { FiBookOpen, FiAward, FiCalendar, FiTrash2 } from "react-icons/fi";

const Education = () => {
  const fetchEducations = useFetchEducation();
  const { educations } = useSelector((state) => state.user);
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${serverUrl}/api/education/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response?.data?.success) {
        toast.success(
          response?.data?.message || "Education added successfully",
        );
        fetchEducations();
        setFormData({
          school: "",
          degree: "",
          startDate: "",
          endDate: "",
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "error in handleSubmit");
      toast.error(error?.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  const deleteEducation = async (id) => {
    try {
      const response = await axios.delete(
        `${serverUrl}/api/education/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response?.data?.success) {
        toast.success(
          response?.data?.message || "Education deleted successfully",
        );
        fetchEducations();
      }
    } catch (error) {
      console.log(error, "error in deleteEducation");
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchEducations();
  }, [fetchEducations]);

  return (
    <div className="space-y-6">
      {/* Premium Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#282828] pb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#F1F1F1] tracking-tight flex items-center gap-2">
            <FiBookOpen className="text-[#3EA6FF] h-5 w-5" />
            Education Hub
          </h1>
          <p className="text-xs text-[#AAAAAA] mt-1">
            Manage your academic credentials and qualifications.
          </p>
        </div>
      </div>

      {/* Modern Creation Form Surface */}
      <div className="bg-[#1F1F1F] border border-[#282828] rounded-xl overflow-hidden">
        <div className="border-b border-[#282828] bg-[#161616]/60 p-5">
          <h3 className="text-sm font-bold text-[#F1F1F1] uppercase tracking-wider">
            Add Academic Record
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Institution Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider block">
                Institution Name
              </label>
              <div className="relative flex items-center">
                <FiBookOpen className="absolute left-3.5 text-[#717171] h-4 w-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. Islamia University"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0F0F0F] border border-[#282828] rounded-xl text-sm placeholder:text-[#606060] text-[#F1F1F1] transition-all outline-none focus:border-[#3EA6FF]"
                  required
                />
              </div>
            </div>

            {/* Degree Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider block">
                Degree / Field of Study
              </label>
              <div className="relative flex items-center">
                <FiAward className="absolute left-3.5 text-[#717171] h-4 w-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. BS Biotechnology"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0F0F0F] border border-[#282828] rounded-xl text-sm placeholder:text-[#606060] text-[#F1F1F1] transition-all outline-none focus:border-[#3EA6FF]"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Start Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider block">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#0F0F0F] border border-[#282828] rounded-xl text-sm text-[#F1F1F1] transition-all outline-none focus:border-[#3EA6FF] [&::-webkit-calendar-picker-indicator]:invert-[0.8]"
                required
              />
            </div>

            {/* End Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider block">
                End Date{" "}
                <span className="text-[#606060] lowercase font-normal tracking-normal">
                  (Or expected)
                </span>
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#0F0F0F] border border-[#282828] rounded-xl text-sm text-[#F1F1F1] transition-all outline-none focus:border-[#3EA6FF] [&::-webkit-calendar-picker-indicator]:invert-[0.8]"
              />
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
                <span>Add Education</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Education Cards Display Section */}
      <div className="pt-4">
        <h3 className="text-sm font-bold text-[#F1F1F1] uppercase tracking-wider mb-5">
          Academic Profile
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {educations?.map((education) => (
            <div
              key={education?._id}
              className="bg-[#1F1F1F] border border-[#282828] rounded-xl p-5 flex flex-col group transition-all hover:border-[#3EA6FF]/50 hover:bg-[#252525]"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-[#F1F1F1] line-clamp-2">
                    {education?.school}
                  </h2>
                  <div className="flex items-center gap-2 mt-1.5">
                    <FiAward className="text-[#3EA6FF] shrink-0 h-4 w-4" />
                    <h3 className="text-sm font-medium text-[#AAAAAA] line-clamp-1">
                      {education?.degree}
                    </h3>
                  </div>
                </div>

                {/* Moment.js Formatted Date Badge */}
                <div className="flex items-center gap-1.5 bg-[#0F0F0F] border border-[#282828] px-2.5 py-1 rounded-md shrink-0">
                  <FiCalendar className="text-[#AAAAAA] h-3 w-3" />
                  <span className="text-[11px] font-mono font-bold text-[#AAAAAA] tracking-tight">
                    {education?.startDate
                      ? moment(education.startDate).format("MMM YYYY")
                      : "N/A"}{" "}
                    -{" "}
                    {education?.endDate
                      ? moment(education.endDate).format("MMM YYYY")
                      : "Present"}
                  </span>
                </div>
              </div>

              {/* Action Footer */}
              <div className="mt-5 pt-4 border-t border-[#282828] flex justify-end">
                <button
                  onClick={() => deleteEducation(education?._id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-[#AAAAAA] uppercase tracking-wider rounded-lg hover:text-[#FF4E4E] hover:bg-[#FF4E4E]/10 transition-colors cursor-pointer focus:outline-none"
                >
                  <FiTrash2 className="h-3.5 w-3.5" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
