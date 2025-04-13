const { default: mongoose } = require("mongoose")
const mongoose = require("mongoose")
const chatModel = mongoose.Schema(
    {
        chatName:{type:String, trim:true},
        isGroupChat:{type:Boolean,default:false},
        users:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }],
        latestMessage:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"message"
        },
        groupAdmin:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    },{
        timeStamp:true
    }
)
const Chat = mongoose.model("Chat",chatModel) // creating the model for schema for interacting with database.
module.export = Chat