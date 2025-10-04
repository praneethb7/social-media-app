// upload post 

import uploadOnCloud from "../config/cloudinary.js";
import User from "../models/user.model.js";

export const uploadPost = async (req, res) => {
    // media file 
    // caption
    // timestamp 
    const { caption, mediaType } = req.body;

    let mediaUrl = '';
    if (req.file) {
        mediaUrl = uploadOnCloud(req.file.path);
    } else {
        return res.status(404).json({ message: "No media file found" });
    }
    try {
        const post = await Post.create({ caption, mediaType, mediaUrl, author: req.userId });

        // userdata 
        // profilepic 
        const user = User.findById(req.userId).populate('posts');
        user.posts.push(post._id);
        await user.save();

        const popPost = await Post.findById(post._id).populate('author', 'userName profileImage')

        return res.status(201).json(popPost);
    } catch (e) {
        console.log(e);
    }
}

export const getAllPosts = async()=> {
    try{
        const posts = await Post.find({}).populate("author","userName profileImage");
        return res.status(200).json(posts);
    } catch(e){
        return res.status(404).json({message:"No Posts Found"});
    }
}