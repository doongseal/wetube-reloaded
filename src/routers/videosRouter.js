import express from "express";

import { watch, videoEdit, getUpload,postEdit ,postUpload} from "../controllers/videosController";

const videosRouter = express.Router();

videosRouter.get("/:id(\\d+)", watch);
videosRouter.route("/:id(\\d+)/edit").get(videoEdit).post(postEdit);

videosRouter.get("/upload", getUpload);
videosRouter.post("/upload", postUpload);

export default videosRouter;
