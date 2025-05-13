const express = require("express")
require("dotenv").config()
const app = express()
const port = process.env.PORT
const hostname = process.env.HOST_NAME;
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRouter")
const chatRoutes = require("./routes/chatRoutes")
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorHandlers");

// allow all origins by default for handling cors error
app.use(cors()) 

mongoose.connect(process.env.CONNECTION_STRING).then((response)=>{console.log(`Mongodb is Connected..............`)})
.catch((err)=>{console.log(err)
    process.exit(1)
})

app.use(express.json()) // body
app.use(express.urlencoded({ extended: true }));

 // sign and login routes
app.use("/api/user",userRoutes)

// chat routes 
app.use("/api/chats",chatRoutes) 

//error handlers
app.use(notFound)
app.use(errorHandler)

app.listen(port,hostname,()=>{
    console.log(`Server starts running on ${port}...`)
})