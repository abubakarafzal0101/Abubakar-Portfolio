import UserModel from "../models/user.model.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error!" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    let {
      name,
      phone,
      watsappNumber,
      address,
      city,
      state,
      country,
      title,
      intro,
      description,
      github,
      linkedin,
      instagram,
      facebook,
      twitter,
      youtube,
      isAvailable,
    } = req.body;
    let user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    if (isAvailable) {
      isAvailable = true;
    } else {
      isAvailable = false;
    }
    let profilePic;
    profilePic = user.profilePic;

    if (req.file && req.file.buffer) {
      try {
        profilePic = await uploadOnCloudinary(req.file.buffer);
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ success: false, message: "Error while Uploading Image" });
      }
    }

    user = await UserModel.findByIdAndUpdate(
      userId,
      {
        name,
        phone,
        watsappNumber,
        address,
        city,
        state,
        country,
        title,
        intro,
        description,
        github,
        linkedin,
        instagram,
        facebook,
        twitter,
        youtube,
        profilePic,
        isAvailable,
      },
      { runValidators: true, new: true },
    );
    return res
      .status(200)
      .json({ success: true, message: "Profile updated!", user });
  } catch (error) {
    console.log(error, "error in update profile");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error!" });
  }
};
