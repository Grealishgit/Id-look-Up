import express from 'express';
import { getUserProfile, login, signUp, updateUserProfile } from '../Controllers/authController.js';
import authenticateToken from '../middlewares/authUser.js';
import upload from '../config/multerConfig.js';


const router = express.Router();

//Login && SignUp Routes
router.post('/signup', signUp);
router.post('/login', login);

// Update user profile (protected route)
router.put('/update-profile', authenticateToken, upload.single('image'), updateUserProfile);

//Get user Data
router.get('/userdata', authenticateToken, getUserProfile);


export default router;
