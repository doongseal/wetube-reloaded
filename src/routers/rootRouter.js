import express from "express";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userController";
import { home, news,search } from "../controllers/videosController";
import { publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();


rootRouter.get("/", home);
rootRouter.get("/new", news);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;




