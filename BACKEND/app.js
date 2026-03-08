const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// create express app
const app = express();




// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["https://moodify-zeta-green.vercel.app", "http://localhost:5173", "http://localhost:3000"],
    credentials: true
}))


// routes
const authRouter = require("./src/routes/auth.routes")
const songRouter = require("./src/routes/song.routes")

app.use("/api/users", authRouter)
app.use("/api/songs-data", songRouter)




module.exports = app;
