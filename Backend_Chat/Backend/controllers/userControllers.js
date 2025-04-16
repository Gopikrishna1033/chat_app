const asyncHandler = require("express-async-handler") // It automatically catches any errors inside your asynchronous route handlers and sends them to the error-handling middleware, simplifying error management.
const User = require("../models/userModel")
const generateToken = require("../token/generateToken")

const registerUser = asyncHandler(async (req,res)=>{
    console.log(req.body)
    const {name,email,password,pic} = req.body

    if (!name || !email || !password){
        res.status(400)
        throw new Error("Please Enter all the fields...")
    }

    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400)
        throw new Error("User already Exists..")
    }

    const user = await User.create({
        name,
        email,
        password,
        pic
    })
    
    if(user){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token: generateToken(user._id)

        })
    }else{
        res.status(400)
        throw new Error("Failed to create the user")
    }
})


//login logic
const authUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body

    const user = await User.findOne({email})

    if (user && await User.matchPassword(password)){
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          pic: user.pic,
          token: generateToken(user._id),
        });
    }
})


module.exports = {registerUser,authUser}