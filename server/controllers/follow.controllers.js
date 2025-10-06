// follow and unfollow 

import User from "../models/user.model.js"

export const followUser = async (req, res) => {
    // current user
    // user to be followed

    const currentUserId = req.userId
    const { userId } = req.params

    if (currentUserId === userId) {
        return res.status(400).json({ message: "Cant follow urself" })
    }

    // find both users
    const [userToFollow, currentUser] = await Promise.all([
        User.findById(userId),
        User.findById(currentUserId)
    ]);

    if(!userToFollow){
        return res.status(400).json({message:"No User to Follow"});
    }

    const isAlreadyFollowing  = currentUser.following.some(
        id => id.toString() === userId
    );

    if(isAlreadyFollowing) {
        return res.status(400).json({message:"Already Following this User"})
    }

    currentUser.following.push(userId);
    userToFollow.followers.push(currentUserId);

    await Promise.all([
        currentUser.save(),
        userToFollow.save()
    ]);

    return res.status(200).json({
        message:"User Followed Successfully",
        following : currentUser.following,
        followersCount : userToFollow.followers.length
    });
}

export const unfollowUser = async(req,res)=>{
    try{
        const {userId} = req.params;
        const currentUserId = req.userId;

        if(userId === currentUserId){
            return res.status(400).json({message:"You cannot unfollow urself"});
        }

        const [userToUnfollow, currentUser] = await Promise.all([
            User.findById(userId),
            User.findById(currentUserId)
        ]);

        if(!userToUnfollow){
            return res.status(404).json({message:"User Not Found"});
        }

        const isFollowing = currentUser.following.some(
            id => id.toString() === userId
        );

        if(!isFollowing){
            return res.status(400).json({message:"You are not following this user"})
        }

        currentUser.following = currentUser.following.filter(
            id => id.toString() !== userId
        );
        userToUnfollow.followers = userToUnfollow.followers.filter(
            id => id.toString() !== currentUserId
        );

        await Promise.all([
            currentUser.save(),
            userToUnfollow.save()
        ]);

        return res.status(200).json({
            message:"User unfollowed Successfully",
            following : currentUser.following,
            followersCount : userToUnfollow.followers.length,
        });

    } catch(e){
        return res.status(500).json(e)
    }
}

export const getFollowStatus = async(req,res)=>{
    try{
        const {userId} = req.params;
        const currentUserId = req.userId

        const currentUser = await User.findById(currentUserId)

        const isFollowing = currentUser.following.some(
            id => id.toString() === userId
        );

        return res.status(200).json({isFollowing});
    } catch(e){
        return res.status(500).json(e);
    }
}