const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const userSchema = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    pic:{
        type:String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    }
},
{
    timeStamp:true
})
userSchema.pre("save",async function (next){
    if (!this.isModified("password")) return  next() // only modify if its modified
        try{
          const salt = bcrypt.genSalt(10); // genereate salt of 10 rounds
          this.password = await bcrypt.hash(this.password, salt);
          next(); // Proceed with saving the user document
        }catch(err){
          next(err); // Pass the error to the next middleware
        }
})
// methods to compare the entered password
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

const User = mongoose.model("User",userSchema)
module.exports = User