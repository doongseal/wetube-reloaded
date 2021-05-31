import express from "express";

import { users, edit, profile } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", users);
userRouter.get("/edit-profile", edit);
userRouter.get("/:id(\\d+)", profile);

export default userRouter;
