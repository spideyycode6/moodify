const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// create express app
const app = express();




// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


// routes
const authRouter = require("./src/routes/auth.routes")
const songRouter = require("./src/routes/song.routes")

app.use("/api/auth",authRouter)
app.use("/api/song",songRouter)




module.exports = app;
 