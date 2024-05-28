const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect");

const session = require('express-session'); 
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose')

const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");         

dbConnect();
app.use(cookieParser('keyboard cat'));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { 
      maxAge: 60 * 30, // In secs, Optional
    },
  })
);
// app.use(
//   session({
//     secret: "secretKey",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(bodyParser.json());  

const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
app.use("/api/user", UserRouter);
app.use("/api/photo", PhotoRouter);

app.get("/", (request, response) => {
  response.send({ message: "Hello from photo-sharing app API!" });
});

app.listen(8081, () => {
  console.log("server listening on port 8081");
});
