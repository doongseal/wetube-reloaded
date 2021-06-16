import express from "express";

import { watch, videoEdit, getUpload,postEdit ,postUpload,deleteVideo} from "../controllers/videosController";
import { proetectorMiddleware, publicOnlyMiddleware, videoUpload } from "../middlewares";
const videosRouter = express.Router();



videosRouter.get("/:id([0-9a-f]{24})", watch);
videosRouter.route("/:id([0-9a-f]{24})/edit").all(proetectorMiddleware).get(videoEdit).post(postEdit);
videosRouter.route("/:id([0-9a-f]{24})/delete").all(proetectorMiddleware).get(deleteVideo)
videosRouter.all(proetectorMiddleware).get("/upload", getUpload);
videosRouter.all(proetectorMiddleware).post("/upload",videoUpload.single("video"), postUpload);



export default videosRouter;
