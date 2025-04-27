const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const asyncHandler = require("express-async-handler");
const { json } = require("express");

const Protect = asyncHandler(async (req,res)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1]

            const decode = jwt.verify(token,process.env.JWT_SECRET)
            req.User = await User.find(decode.id).select("password")
            next()
        }catch(err){
            res.status(401)
            throw new Error ("authorization failed, token failed")
        }
        if(!token){
            res.status(401)
            throw new Error ("authorization failed, token failed")
        }

    }
})
module.exports = {Protect}