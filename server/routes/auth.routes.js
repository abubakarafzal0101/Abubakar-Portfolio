import express from "express";
import { registerUser, testingApi } from "../controllers/auth.controllers.js";
const authRouter = express.Router();

authRouter.get("/test", testingApi);
authRouter.post("/register", registerUser);
export default authRouter;
