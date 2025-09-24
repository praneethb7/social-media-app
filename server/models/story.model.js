import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
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
    mediaUrl: {
        type: String,
        required,
    },

    // viewers
    viewers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required,
    },
    ],

    // time 
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 86400 // 24 hours 
    }
}, { timestamps: true });

const Story = mongoose.model("story", storySchema);
export default Story;