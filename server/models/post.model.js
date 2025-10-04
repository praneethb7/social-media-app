import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    // user
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },

    // type
    mediaType: {
        type: String,
        enum: ['image', 'video'],
        required: true,
    },
    mediaUrl: {
        type: String,
        required: true,
    },

    // caption
    caption: {
        type: String,
        default: ''
    },

    // likes & comments 
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: true
            },
            text: {
                type: String,
                required: true,
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