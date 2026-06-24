import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
const Profile = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const token = localStorage.getItem("token");
  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
    watsapNumber: "",
    address: "",
    city: "",
    state: "",
    country: "",
    title: "",
    intro: "",
    description: "",
    github: "",
    linkedin: "",
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
  });
  const [isAvailable, setIsAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewProfilePic, setPreviewProfilePic] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const handleAvailabilityChange = (e) => {
    setIsAvailable(e.target.checked);
  };

  const handleProfilePic = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setPreviewProfilePic(URL.createObjectURL(file));
  };

  const handleProfileDataChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }
    formData.append("name", profileData.name);
    formData.append("phone", profileData.phone);
    formData.append("watsapNumber", profileData.watsapNumber);
    formData.append("address", profileData.address);
    formData.append("city", profileData.city);
    formData.append("state", profileData.state);
    formData.append("country", profileData.country);
    formData.append("title", profileData.title);
    formData.append("intro", profileData.intro);
    formData.append("description", profileData.description);
    formData.append("github", profileData.github);
    formData.append("linkedin", profileData.linkedin);
    formData.append("facebook", profileData.facebook);
    formData.append("instagram", profileData.instagram);
    formData.append("twitter", profileData.twitter);
    formData.append("youtube", profileData.youtube);
    formData.append("isAvailable", isAvailable);
    try {
      const response = await axios.put(
        `${serverUrl}/api/user/update-profile`,
        { formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  return (
    <>
      <h1>Edit Profile</h1>
      <form onSubmit={onSubmitHandler}>
        <img
          src={previewProfilePic}
          alt="profile-pic"
          height={"100px"}
          width={"100px"}
        />
        <input
          type="file"
          placeholder="profilePic"
          onChange={handleProfilePic}
        />{" "}
        <br />
        <br />
        <input
          type="text"
          placeholder="name"
          name="name"
          onChange={handleProfileDataChange}
          value={profileData.name}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="phone"
          name="phone"
          onChange={handleProfileDataChange}
          value={profileData.phone}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="watsap number"
          name="watsapNumber"
          onChange={handleProfileDataChange}
          value={profileData.watsapNumber}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="Address"
          name="address"
          onChange={handleProfileDataChange}
          value={profileData.address}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="city"
          name="city"
          onChange={handleProfileDataChange}
          value={profileData.city}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="state"
          name="state"
          onChange={handleProfileDataChange}
          value={profileData.state}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="country"
          name="country"
          onChange={handleProfileDataChange}
          value={profileData.country}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="title"
          name="title"
          onChange={handleProfileDataChange}
          value={profileData.title}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="intro"
          name="intro"
          onChange={handleProfileDataChange}
          value={profileData.intro}
        />
        <br />
        <br />
        <textarea
          name="description"
          placeholder="description"
          id=""
          name="description"
          onChange={handleProfileDataChange}
          value={profileData.description}
        ></textarea>
        <br />
        <br />
        <input
          type="text"
          placeholder="github"
          name="github"
          onChange={handleProfileDataChange}
          value={profileData.github}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="linkedin"
          name="linkedin"
          onChange={handleProfileDataChange}
          value={profileData.linkedin}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="instagram"
          name="instagram"
          onChange={handleProfileDataChange}
          value={profileData.instagram}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="facebook"
          name="facebook"
          onChange={handleProfileDataChange}
          value={profileData.facebook}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="twitter"
          name="twitter"
          onChange={handleProfileDataChange}
          value={profileData.twitter}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="youtube"
          name="youtube"
          onChange={handleProfileDataChange}
          value={profileData.youtube}
        />
        <br />
        <br />
        <input type="checkbox" onChange={handleAvailabilityChange} />
        IsAvailable
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Profile;
