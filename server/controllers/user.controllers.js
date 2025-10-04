import uploadOnCloud from "../config/cloudinary.js";
import User from "../models/user.model.js"

export const getCurrentUser = async (req, res) => {
  const userId = req.userId
  try {
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json({ user });

  } catch (e) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const getProfile = async (req, res) => {
  try {
    const userName = req.params.userName;
    const user = await User.findOne({ userName }).select('-password');

    if (!user) {
      res.status(404).json({ message: "user not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
};

export const editProfile = async (req, res) => {
  // userName, name, bio
  try {
    const { userName, name, bio } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    // check for duplicate usernames 
    const existingUser = await User.findOne({ userName, _id: { $ne: req.userId } });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }
    // Image 
    let profileImage;
    if (req.file) {
      profileImage = await uploadOnCloud(req.file.path)
    }

    // update user details
    user.name = name
    user.userName = userName
    user.bio = bio
    if (profileImage) {
      user.profileImage = profileImage
    }
    await user.save();

    return res.status(201).json(user);
  } catch (e) {
    console.log(e);
  }
}