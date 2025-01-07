import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    profileImage:{
        type: String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type:Date,
        default: Date.now
    }

},{timestamps:true})

export const UserModel = mongoose.models.User || mongoose.model('User',userSchema)

