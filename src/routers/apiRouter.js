import express from "express";
import  {registerView} from "../controllers/videosController";

const apiRouter = express.Router();

export default apiRouter;


apiRouter.post("videos/:id([0-9a-f]{24})/view", registerView);