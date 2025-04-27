const express = require("express")
require("dotenv").config()
const app = express()
const port = process.env.PORT
const hostname = process.env.HOST_NAME;
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRouter")
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorHandlers");
app.use(cors()) // allow all origins by default


mongoose.connect(process.env.CONNECTION_STRING).then((response)=>{console.log(`Mongodb is Connected..............`)})
.catch((err)=>{console.log(err)
    process.exit(1)
})
app.use(express.json()) // body
app.use("/api/user",userRoutes)
app.user(notFound)
app.user(errorHandler)
app.listen(port,hostname,()=>{
    console.log(`Server starts running on ${port}...`)
})