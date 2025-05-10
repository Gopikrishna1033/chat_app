const mongoose = require("mongoose")
const messageModel = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //In Mongoose, the ref property is used to create a reference between schemas. It's especially useful in MongoDB when you want to implement relationships between collections, similar to foreign keys in relational databases.
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      // chat room or thread where this message was sent
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  {
    timeStamp: true,
  }
);
const Message = mongoose.model("Message",messageModel)
module.exports = Message