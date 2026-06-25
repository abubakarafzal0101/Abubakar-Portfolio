import express from "express";
import {
  addSkill,
  deleteSkill,
  getSkills,
} from "../controllers/skill.controllers.js";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";
const skillRouter = express.Router();

skillRouter.post("/add", isAuth, upload.single("skillImage"), addSkill);
skillRouter.delete("/delete/:skillId", isAuth, deleteSkill);
skillRouter.get("/get-all", getSkills);

export default skillRouter;
