import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  const { userToken } = req.cookies;

  if(!userToken)
    return res.json({success: false, message: 'Not Authorized, Please login'});
  
  try {
    const tokenDecode = jwt.verify(userToken, process.env.JWT_SECRET);

    if(tokenDecode.id) {
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({success: false, message: 'User not Found, Login Again'})
    }
    next();

  } catch (error) {
      return res.json({success: false, message: error.message});
  }
}

export default userAuth;