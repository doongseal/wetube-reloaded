import express from "express";

import {  edit, profile,startGithubLogin,finishGithubLogin,logout } from "../controllers/userController";

const userRouter = express.Router();


userRouter.get("/edit-profile", edit);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/logout", logout);
userRouter.get("/:id(\\d+)", profile);

export default userRouter;
