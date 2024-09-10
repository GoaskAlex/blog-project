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
        default:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.megavoxels.com%2Fwp-content%2Fuploads%2F2023%2F11%2FPixel-Art-Mushroom-6.jpg&f=1&nofb=1&ipt=82af5000ee397af4a6dcbc8c4f6d8ebedf52ce414aad965e4865ede30e1b96a8&ipo=images",
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    },
    {timestamps:true}
)

const User = mongoose.model('User', userSchema);

export default User;