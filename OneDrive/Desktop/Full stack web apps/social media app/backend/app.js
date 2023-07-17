const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
// const bodyParser = require("body-parser");

if(process.env.NODE_ENV !== "production") {
    require("dotenv").config({path: "backend/config/config.env"});
}



//using middlewares
app.use(express.json({ limit: "50mb"}));
app.use(express.urlencoded({ limit: "50mb", extended: true}));
// app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(fileUpload());

//Importing routes
const postRoute = require("./routes/post");
const userRoute = require("./routes/user");

//Using routes
app.use("/api/v1", postRoute);
app.use("/api/v1", userRoute);

module.exports = app;