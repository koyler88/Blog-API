require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const postsRouter = require("./routes/postsRouter");
const authRouter = require("./routes/authRouter");
const commentsRouter = require("./routes/commentsRouter");

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Cors for allowing different ports to communicate
app.use(cors());

// Posts Router
app.use("/posts", postsRouter);
// Auth and Login
app.use("/auth", authRouter);
// Comments Router
app.use("/comments", commentsRouter);

app.listen(3000, () => console.log("App running on port 3000"));
