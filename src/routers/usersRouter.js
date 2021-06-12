import express from "express";

import { users, edit, profile,startGithubLogin,finishGithubLogin } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", users);
userRouter.get("/edit-profile", edit);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/:id(\\d+)", profile);

export default userRouter;
