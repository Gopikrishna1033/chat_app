const asyncHandler = require("express-async-handler"); // It automatically catches any errors inside your asynchronous route handlers and sends them to the error-handling middleware, simplifying error management.
const User = require("../models/userModel");
const generateToken = require("../token/generateToken");
const sharp = require("sharp");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the fields...");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already Exists..");
  }

  let imgBase64 = "";
  if (req.file) {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 100, height: 100 })
      .jpeg({ quality: 70 })
      .toBuffer();
    imgBase64 = buffer.toString("base64");
  } else {
    const defaultImageUrl =
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

    imgBase64 = defaultImageUrl.toString("base64");
  }

  const user = await User.create({
    name,
    email,
    password,
    image: imgBase64,
  });

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user");
  }
});

//login logic
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(401); // Unauthorized
    throw new Error("Invalid Email or Password");
  }
});

//
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [ // searching over name or email by using regex here i stands for seaching for both lower and upper case letters.
          { name: { $regex: req.query.search, $options: "i" } }, 
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } }); // searching over all user except the current user  
  res.status(200).json(users);
});

module.exports = { registerUser, authUser, allUsers };
