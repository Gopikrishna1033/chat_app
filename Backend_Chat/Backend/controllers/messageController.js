const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModels");
const sendMessages = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }
  var newMessage = {
    sender: req.user._id,
    content: content,
    chatId: chatId,
  };
  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name image");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name image email",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
    throw new Error(err.message);
  }
});

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.findId({
      chat: req.params.chatId,
    })
      .populate("sender", "name image email")
      .populate("chat");
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });

    throw new Error(err.message);
  }
});

module.exports = { sendMessages, allMessages };
