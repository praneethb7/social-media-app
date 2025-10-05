import express from "express";
import { getAllPosts, uploadPost } from "../controllers/post.controllers.js";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";


const postRouter = express.Router();

postRouter.post('/upload', isAuth, upload.single('mediaUrl'), uploadPost);
postRouter.get("/getallposts",getAllPosts);

export default postRouter;