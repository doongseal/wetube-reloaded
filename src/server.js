
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "express-flash";


const PORT = 4500;

import rootRouter from "./routers/rootRouter";
import usersRouter from "./routers/usersRouter";
import videosRouter from "./routers/videosRouter";
import {localsMiddleware} from "./middlewares";
import apiRouter from "./routers/apiRouter";

const app = express();

app.set("view engine","pug");
app.set("views", process.cwd()+"/src/views");
app.use(morgan("dev"));
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized : false,
    
    store: MongoStore.create({mongoUrl:process.env.DB_URL}),
}));


app.use(flash());
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"))
app.use("/assets", express.static("assets"))
app.use("/", rootRouter);
app.use("/users", usersRouter);
app.use("/videos", videosRouter);
app.use("/api", apiRouter);


export default app

