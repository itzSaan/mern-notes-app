import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if(!user)
      return res.json({success: false, message: 'User not Found!'});

    return res.json({success: true, userData: {
      name: user.name,
      isUserVerified: user.isUserVerified,
    }})
    
  } catch (error) {
    return res.json({success: false, message: error.message});
  }

}