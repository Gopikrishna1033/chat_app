const express = require("express")
require("dotenv").config()
const app = express()
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server starts running on ${PORT}`)
})