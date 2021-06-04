import express from "express";
import { join, login } from "../controllers/userController";
import { trending, news } from "../controllers/videosController";

const globalRouter = express.Router();


globalRouter.get("/", trending);
globalRouter.get("/new", news);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

export default globalRouter;
