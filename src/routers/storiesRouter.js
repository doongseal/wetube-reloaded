import express from "express";

import { main, storyEdit, storyDelete } from "../controllers/storiesController";

const storiesRouter = express.Router();

storiesRouter.get("/:id(\\d+)", main);
storiesRouter.get("/:id(\\d+)/edit", storyEdit);
storiesRouter.get("/:id(\\d+)/delete", storyDelete);

export default storiesRouter;
