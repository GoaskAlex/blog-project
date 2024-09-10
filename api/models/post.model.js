import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true,
            unique:true
        },
        image:{
            type:String,
            default:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F010%2F966%2F769%2Foriginal%2Fmail-letter-pixel-free-vector.jpg&f=1&nofb=1&ipt=62cbc7670e8c5f3ba31e7a307ed5b3f824c91740a70b42a582f50b6962ec8661&ipo=images"
        },
        category:{
            type:String,
            default:'uncategorized'
        },
        slug:{
            type:String,
            required:true,
            unique:true,
        },
    },{timestamps:true}
)

const Post = mongoose.model('Post', postSchema)

export default Post