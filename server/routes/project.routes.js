import express from "express";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";
import {
  addProject,
  deleteProject,
  GetAdminProjects,
} from "../controllers/project.controllers.js";
const projectRouter = express.Router();

projectRouter.post("/add", isAuth, upload.single("projectImage"), addProject);
projectRouter.delete("/delete/:projectId", isAuth, deleteProject);
projectRouter.get("/get-admin-projects", isAuth, GetAdminProjects);

export default projectRouter;
