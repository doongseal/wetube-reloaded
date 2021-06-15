import express from "express";

import {  profile,startGithubLogin,finishGithubLogin,logout,getEdit, postEdit } from "../controllers/userController";
import { proetectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();


userRouter.route("/edit").all(proetectorMiddleware).get(getEdit).post(postEdit);

userRouter.get("/github/start",publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish",publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/logout", proetectorMiddleware, logout);
userRouter.get("/:id(\\d+)", profile);

export default userRouter;
