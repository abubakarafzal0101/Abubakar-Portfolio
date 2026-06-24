import express from "express";
import {
  getCurrentUser,
  updateProfile,
} from "../controllers/user.controllers.js";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";
const userRouter = express.Router();

userRouter.get("/current-user", isAuth, getCurrentUser);
userRouter.put(
  "/update-profile",
  isAuth,
  upload.single("profilePic"),
  updateProfile,
);
export default userRouter;
