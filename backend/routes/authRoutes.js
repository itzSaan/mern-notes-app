import express from 'express';
import { registerUser, loginUser, logoutUer, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';
import { getUserData } from '../controllers/userController.js';

const authRouter = express.Router();

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.post('/logout', logoutUer)
authRouter.post('/send-verification-otp', userAuth, sendVerifyOtp)
authRouter.post('/verify-email', userAuth, verifyEmail)
authRouter.get('/is-auth', userAuth, isAuthenticated)
authRouter.get('/user-data', userAuth, getUserData)
authRouter.post('/reset-otp', sendResetOtp)
authRouter.post('/reset-password', resetPassword)

export default authRouter;