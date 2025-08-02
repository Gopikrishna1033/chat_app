const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Chat = require("../models/chatModels");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("User param not sent with request");
    return res.sendStatus(400);
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      {
        users: { $elemMatch: { $eq: req.user._id } }, //$elemMatch is a query operator that is used when you want to match one or more elements inside an array — especially if the array contains complex values (like objects) or if you want to apply multiple conditions to a single array element.
        users: { $elemMatch: { $eq: userId } },
      },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name, pic email",
  });
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);

      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.send(200).send(fullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

// fetch Chats

const fetchChat = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error(error.message);
  }
});

// create Group Chat

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res
      .status(400)
      .send({ message: "Please Select atleast two member to create a group." });
  }
  var users = JSON.parse(req.body.users);
  console.log(users, "users");
  if (users.length < 2) {
    return res
      .status(400)
      .send("Atleast two members are required to create a group.");
  }
  users.push(req.user);
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    console.log(error);
  }
});

//rename the group

const renameGroupChat = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!updatedChat) {
    res.status(400);
    throw new Error("Group not Found");
  } else {
    res.status(200).json(updatedChat);
  }
});

// add group member

const addGroupMember = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  if (!chatId || !userId) {
    return res.status(400).json({ message: "chatId and userId are required" });
  }

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { $addToSet: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!updatedChat) {
    res.send(400);
    throw new Error("Chat Not Found");
  } else {
    res.status(200).json(updatedChat);
  }
});

//remove user from group
const removeGroupMember = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  if (!chatId || !userId) {
    res.status(400).json({ message: "chatId and userId are required" });
  }
  //The MongoDB $pop operator removes the first or last element from an array based on its position, but it doesn't directly remove a specific element (like a userId) from the array.To remove a specific member, you should use the $pull operator, which removes all instances of a specific value from an array.
  const removeUser = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } }, // Use $pull to remove the user from the users array
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!removeUser) {
    res.send(400);
    throw new Error("Chat Not Found");
  } else {
    res.status(200).json(removeUser);
  }
});

// delete the Group Chat

const deleteGroupChat = asyncHandler(async (req, res) => {
  const { chatId } = req.body;
  if (!chatId) {
    res.status(400);
    throw new Error("Chat not found");
  }
  const deleteGroup = await Chat.findById(chatId);
  if (!deleteGroup) {
    res.status(400);
    throw new Error("Group not found");
  } else {
    await deleteGroup.deleteOne(); // or Chat.findByIdAndDelete(chatId)
    res.status(200).json({ message: "Group chat deleted successfully" });
  }
});

module.exports = {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroupChat,
  addGroupMember,
  removeGroupMember,
  deleteGroupChat,
};
