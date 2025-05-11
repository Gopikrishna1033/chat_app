const mongoose = require("mongoose")
const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //The populate() method in Mongoose solves this problem by automatically replacing the ObjectId with the actual data from the referenced collection
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timeStamps: true,
  }
);
const Chat = mongoose.model("Chat",chatModel) // creating the model for schema for interacting with database.
module.exports = Chat