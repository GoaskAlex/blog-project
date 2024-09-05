import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        default:"https://pbs.twimg.com/media/GWnf_k_WcAAt2E7?format=jpg&name=medium",
    },
    },
    {timestamps:true}
)

const User = mongoose.model('User', userSchema);

export default User;