import express from 'express';
import { login, signUp } from '../Controllers/authController.js';


const router = express.Router();

// POST request to login
router.post('/signup', signUp);

// POST request to signup
router.post('/login', login)





export default router;
