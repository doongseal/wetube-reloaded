
import express from "express";
import morgan from "morgan";

const PORT = 4000;

import globalRouter from "./routers/globalRouter";
import usersRouter from "./routers/usersRouter";
import storiesRouter from "./routers/storiesRouter";

const app = express();
app.use(morgan("dev"));


app.use("/", globalRouter);
app.use("/users", usersRouter);
app.use("/stories", storiesRouter);




const handelListening = () => console.log(`Server Listening on port http://localhost:${PORT}`)


app.listen(PORT, handelListening)