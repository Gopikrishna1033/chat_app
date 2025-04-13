const express = require("express")
const chats = require("../data/data")
const router = express.Router()
router.get("/",(request,response)=>{
    response.send(chats)
})
module.exports = router