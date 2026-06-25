import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skillName: {
      type: String,
      required: true,
    },
    proficiency: {
      type: Number,
      required: true,
    },
    skillImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const SkillModel =
  mongoose.models.skill || mongoose.model("skill", skillSchema);

export default SkillModel;
