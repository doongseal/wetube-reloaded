import regeneratorRuntime from "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server"



const handelListening = () => console.log(`Server Listening on port http://localhost:4120`)


app.listen(4120, handelListening)