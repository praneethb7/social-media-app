import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { followUser, getFollowStatus, unfollowUser } from "../controllers/follow.controllers.js";

const followRouter = express.Router();

followRouter.post("/:userId", isAuth, followUser);
followRouter.post("/unfollow/:userId", isAuth, unfollowUser);
followRouter.get("/status/:userId", isAuth, getFollowStatus);

export default followRouter;