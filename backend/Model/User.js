const mongoose = require("mongoose")
const jobarraySchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    jobtitle:{
        type:String,
        required:true,
    }
})
const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,   
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    jobs:[jobarraySchema]
})
const UserModel = mongoose.model("jobuser" , UserSchema)
module.exports = UserModel