// upload post 

import uploadOnCloud from "../config/cloudinary.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";

export const uploadPost = async (req, res) => {
    try {
        const { caption, mediaType } = req.body;

        if (!req.file) {
            return res.status(404).json({ message: "No media file found" });
        }

        const mediaUrl = await uploadOnCloud(req.file.path);

        const post = await Post.create({
            caption,
            mediaType,
            mediaUrl,
            author: req.userId,
        });

        const user = await User.findById(req.userId);
        user.posts.push(post._id);
        await user.save();

        const allPosts = await Post.find()
            .populate("author", "userName profileImage")
            .sort({ createdAt: -1 });

        return res.status(201).json(allPosts);
    } catch (e) {
        return res.status(500).json(e);
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({})
            .populate("author", "userName profileImage")
            .sort({ createdAt: -1 });;
        return res.status(200).json(posts);
    } catch (e) {
        return res.status(404).json({ message: "No Posts Found" });
    }
}

export const like = async (req, res) => {
    // get user 
    // get post id
    // check for already liked or not
    // if not add like, else unlike 

    const postId = req.params.postId
    const post = await Post.findById(postId)

    if (!post) {
        return res.status(404).json({ message: "No Post Found" });
    }

    const alreadyLiked = post.likes.some((id) => id.toString() === req.userId.toString());

    if (alreadyLiked) {
        post.likes = post.likes.filter(id => id.toString() !== req.userId.toString())
    } else {
        post.likes.push(req.userId);
    }

    await post.save();
    await post.populate('author', 'userName profileImage')

    return res.status(200).json(post)
}

export const comments = async(req,res)=>{
    
}