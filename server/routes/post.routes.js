import express from "express";
import { getAllPosts, like, uploadPost } from "../controllers/post.controllers.js";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";


const postRouter = express.Router();

postRouter.post('/upload', isAuth, upload.single('mediaUrl'), uploadPost);
postRouter.get("/getallposts", getAllPosts);
postRouter.post('/like/:postId', isAuth, like)

export default postRouter;