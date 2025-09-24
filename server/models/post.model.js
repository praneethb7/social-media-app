import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    // user
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required,
    },

    // type
    mediaType: {
        type: String,
        enum: ['image', 'video'],
        required,
    },
    mediaUrl:{
        type:String,
        required,
    },

    // caption
    caption:{
        type:String,
        default:''
    },

    // likes & comments 
    likes: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required,
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required
            },
            text: {
                type: String,
                required,
            },
            createdAt: {
                type: Date,
                default: Date.now(),
            },
        },
    ],
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);
export default Post;