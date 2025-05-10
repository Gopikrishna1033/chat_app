const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { json } = require("express");

const Protect = asyncHandler(async (req, res,next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(401);
      throw new Error("authorization failed, token missing");
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET); // here verifying the token using secret key it it is valid we will get this id ,iat ,experies as a details it contains{id:"data",iat:"data",experiesin:"data"}
      req.user = await User.findById(decode.id).select("-password"); // here using the same id for getting the user detail so to not include password we used "-" which is In Mongoose (MongoDB ODM), the minus - symbol is used to exclude fields when querying documents.
      next();
    } catch (err) {
      res.status(401);
      console.log(err);
      throw new Error(err);
    }
  }
});
module.exports = { Protect };
