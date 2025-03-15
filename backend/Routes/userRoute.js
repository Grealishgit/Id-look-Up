import express from 'express';
import { login, signUp } from '../Controllers/authController.js';
import authenticateToken from '../middlewares/authUser.js';

const router = express.Router();

// POST request to signup
router.post('/signup', signUp);

// POST request to login
router.post('/login', login);



export default router;
