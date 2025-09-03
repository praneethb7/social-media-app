import User from "../models/user.model.js"

export const getCurrentUser = async(req,res)=>{
    const userId = req.userId
    try{
        const user = await User.findById(userId).select('-password');

        if(!user){
            return res.status(404).json({message:"User Not Found"});
        }
        res.status(200).json({user});

    } catch(e){
        return res.status(500).json({message:'Internal Server Error'})
    }
}