import express from "express";
import { join, login } from "../controllers/userController";
import { home, news,search } from "../controllers/videosController";

const globalRouter = express.Router();


globalRouter.get("/", home);
globalRouter.get("/new", news);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

export default globalRouter;
