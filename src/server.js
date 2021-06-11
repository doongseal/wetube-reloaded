
import express from "express";
import morgan from "morgan";
import session from "express-session";


const PORT = 4500;

import rootRouter from "./routers/rootRouter";
import usersRouter from "./routers/usersRouter";
import videosRouter from "./routers/videosRouter";
import {localsMiddleware} from "./middlewares";

const app = express();
app.set("view engine","pug");
app.set("views", process.cwd()+"/src/views");
app.use(morgan("dev"));
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:"Hello!",
    resave: true,
    saveUninitialized : true,
}));



app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/users", usersRouter);
app.use("/videos", videosRouter);


export default app

