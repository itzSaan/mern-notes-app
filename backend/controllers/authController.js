import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from '../config/nodemailer.js'

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// Register user Controller
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password)
    return res.json({ success: false, message: "Name, emaill and Password required!" });

  try {
    const existUser = await userModel.findOne({ email });
    if (existUser) 
      return res.json({ success: false, message: "User Already Exist." });
    
    const hashedPassword = await bcrypt.hash(password, 10); // hash the password using bcrypt
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    // Generate json web token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // save the token in cookies
    res.cookie("userToken", token, cookieOptions);

    //Send Welcome message
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Welcome to Notes',
      text: 'We are happy to have you on board. Enjoy our Services!'
    };
    await transporter.sendMail(mailOptions);
    // Send success response
    res.json({ success: true, message: "User Registered Successfully!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and Password Required!",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return res.json({ success: false, message: "Email id is not found." });
    // match password
    const isMatch = await bcrypt.compare(password, user.password); 
    if (!isMatch)
      return res.json({ success: false, message: "Password is Incorrect!" });
    //Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    // Save token to cookies
    res.cookie("userToken", token, cookieOptions);

    return res.json({ success: true, message: "User Logged in Successfully" });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Logout User Controller
export const logoutUer = async (req, res) => {
  try {
    res.clearCookie('userToken');

    return res.json({ success: true, message: 'User Logged out Successfully.' })
  } catch (error) {
    return res.json({ success: false, message: error.message });    
  }
}

// Send Verify OTP Controller
export const sendVerifyOtp = async (req, res) => {
  try {
  const { userId } = req.body;

  const user = await userModel.findById(userId);
  if (user.isUserVerified)
    return res.json({success: false, message: 'Account is already Verified!'});

  const otp = String(Math.floor(100000 + Math.random() * 900000));

  user.verifyOtp = otp;
  user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

  await user.save();

  // set mail options
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: user.email,
    subject: 'Account Verification OTP',
    text: `Your OTP is ${otp}. Verify your email using this OTP.`
  };
  // Send mail
  await transporter.sendMail(mailOptions);

  return res.json({ success: true, message: 'Verification OTP sent to mail.'});
  
} catch (error) {
  return res.json({ success: false, message: error.message});
}
}

// Email verify controller
export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  
  if (!userId || !otp)
    return res.json({ success: false, message: 'Verification OTP and UserId are Missing.'});

  try {
    const user = await userModel.findById(userId);
    if(!user)
      return res.json({success:false, message: 'User not Found'});
    if(user.verifyOtp === '' || user.verifyOtp !== otp)
      return res.json({success:false, message: 'OTP is empty or Invalid'});
    if(user.verifyOtpExpireAt < Date.now())
      return res.json({success:false, message: 'OTP is expired!'});

    user.isUserVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpireAt = 0;

    await user.save();
    return res.json({success: true, message: 'Email or User is verified!'});
    
  } catch (error) {
    return res.json({success: false, message: error.message})
  }
}

// Check user auth status ( middleware is checking this using token)
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({success: true, message: 'User is Authenticated!'});
    
  } catch (error) {
    return res.json({success: false, message: error.message});    
  }
}

// Send Password reset OTP
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  if(!email)
    return res.json({success: false, message: 'Please provide Email'});
  
  try {
    const user = await userModel.findOne({email});
    if(!user)
    return res.json({success: false, message: 'Email is not registered with us.'});    

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Password Reset OTP',
      text: `Your OTP is ${otp}. Valid for 15 minutes. Use OTP to reset your Password`
    };

    await transporter.sendMail(mailOptions);

    return res.json({success: true, message: 'Password reset OTP sent to email'});
  } catch (error) {
    return res.json({success: false, message: error.message});    
  }
};

// Verify OTP and reset Password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if(!email || !otp || !newPassword)
    return res.json({success:false, message: 'All details are required!'});

  try {
    const user = await userModel.findOne({email});
    if(!user)
      return res.json({success: false, message: 'Email not found!'});
    
    if(user.resetOtp === '' || user.resetOtp !== otp)
      return res.json({success: false, message: 'Invalid OTP'});

    if(user.resetOtpExpireAt < Date.now())
      return res.json({success: false, message: 'OTP Expired!'});

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = '';
    user.resetOtpExpireAt = 0;

    await user.save();

    return res.json({success: true, message: 'Password has been reset successfully!'})

  } catch (error) {
    return res.json({success: false, message: error.message});
  }
}