import express from "express";

const app = express();

const gossipMiddleware = (req, res, next) => {
    console.log(req.url);
    next();
}

const privateMiddleware = (req,res,next) => {
    const url = req.url;
    if(url === "/protected"){
        return res.send("<h1>Not Allowed</h1>")
    }
    console.log("Allowed, you may continue.")
    next();

}
const handleHome = (req, res) => {
  return res.send("I love middlewares");
};

const handleProtected = (req,res)  => {
    return res.send("Welcome to the private lounge.")


}

const timeLogger = (req, res, next) => {
    const date = new Date()

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    console.log(`Time: ${year}.${month}.${day}`);
    next();
  };


app.use(timeLogger);
app.use(gossipMiddleware);
app.use(privateMiddleware);


app.get("/", handleHome);

app.get("/protected", handleProtected);


const handleListening = () => console.log("App running");

app.listen(4300, handleListening);
