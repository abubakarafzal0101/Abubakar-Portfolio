import SkillModel from "../models/skill.model.js";
import UserModel from "../models/user.model.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";

export const addSkill = async (req, res) => {
  try {
    const userId = req.userId;
    const skillName = req.body.skillName;
    let proficiency = req.body.proficiency;
    proficiency = parseInt(proficiency);
    let skillImage;
    if (!skillName || isNaN(proficiency)) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    const user = await UserModel.find({ _id: userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload an image" });
    }
    try {
      skillImage = await uploadOnCloudinary(req.file.buffer, "skill-images");
    } catch (error) {
      console.log(error, "error in uploading skill image");
      return res
        .status(500)
        .json({ success: false, message: "Error in uploading image" });
    }
    const skill = await SkillModel.create({
      userId,
      skillName,
      proficiency,
      skillImage,
    });
    return res
      .status(200)
      .json({ success: true, message: "Skill added successfully", skill });
  } catch (error) {
    console.log(error, "error in add skill");
    return res
      .status(500)
      .json({ success: false, message: "something went wrong" });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const skillId = req.params.skillId;
    const userId = req.userId;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    const skill = await SkillModel.findOneAndDelete({
      _id: skillId,
      userId: userId,
    });
    if (!skill) {
      return res
        .status(404)
        .json({ success: false, message: "Skill not found!" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Skill deleted successfully" });
  } catch (error) {
    console.log(error, "error in Delete skill");
    return res
      .status(500)
      .json({ success: false, message: "something went wrong" });
  }
};

export const getSkills = async (req, res) => {
  try {
    const skills = await SkillModel.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, skills });
  } catch (error) {
    console.log(error, "error in Get skill");
    return res
      .status(500)
      .json({ success: false, message: "something went wrong" });
  }
};
