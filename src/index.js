
import express from "express";
import morgan from "morgan";

const PORT = 4000;

import globalRouter from "./routers/globalRouter";
import usersRouter from "./routers/usersRouter";
import videosRouter from "./routers/videosRouter";

const app = express();
app.set("view engine","pug");
app.set("views", process.cwd()+"/src/views");
app.use(morgan("dev"));
app.use(express.urlencoded({extended:true}));


app.use("/", globalRouter);
app.use("/users", usersRouter);
app.use("/videos", videosRouter);




const handelListening = () => console.log(`Server Listening on port http://localhost:${PORT}`)


app.listen(4300, handelListening)