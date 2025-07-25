const express = require('express')
const app = express();
const cors = require("cors")
const postsRouter = require("./routes/postsRouter")

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
// Cors for allowing different ports to communicate
app.use(cors())

app.use('/posts', postsRouter)



app.listen(3000, () => console.log("App running on port 3000"))