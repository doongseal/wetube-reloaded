import express from "express";
import { home, join, login } from "../controllers/userController";
import { trending, news } from "../controllers/storiesController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/trending", trending);
globalRouter.get("/new", news);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

export default globalRouter;
