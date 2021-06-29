import express from "express";

import {  profile,startGithubLogin,finishGithubLogin,logout,postChangePassword, getEdit,postEdit , getChangePassword, } from "../controllers/userController";
import { proetectorMiddleware, publicOnlyMiddleware, avatarUpload,  } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", proetectorMiddleware, logout);
userRouter.route("/edit").all(proetectorMiddleware).get(getEdit).post(avatarUpload.single("avatar"), postEdit);


userRouter.route("/change-password").all(proetectorMiddleware).get(getChangePassword).post(postChangePassword);

userRouter.get("/github/start",publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish",publicOnlyMiddleware, finishGithubLogin);

userRouter.get("/:id", profile);

export default userRouter;
