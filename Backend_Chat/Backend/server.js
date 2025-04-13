const express = require("express")
require("dotenv").config()
const app = express()
const PORT = process.env.PORT
const router = require("./routes/routes")
const cors = require("cors")
app.use(cors()) // allow all origins by default
app.use(express.json()) // body 
app.use("/api/chat",router)
app.listen(PORT,()=>{
    console.log(`Server starts running on ${PORT}...`)
})