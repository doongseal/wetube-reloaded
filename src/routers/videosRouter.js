import express from "express";

import { watch, videoEdit, getUpload,postEdit ,postUpload} from "../controllers/videosController";

const videosRouter = express.Router();



videosRouter.get("/:id([0-9a-f]{24})", watch);
videosRouter.route("/:id([0-9a-f]{24})/edit").get(videoEdit).post(postEdit);
videosRouter.get("/upload", getUpload);
videosRouter.post("/upload", postUpload);



export default videosRouter;
