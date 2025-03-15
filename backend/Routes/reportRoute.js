import express from 'express';
import { reportLostId, reportLostPassport } from '../Controllers/lostDocuments.js';
import authenticateToken from '../middlewares/authUser.js';

const router = express.Router();

// POST request to report a lost ID
router.post('/lost-id', reportLostId);

//POST request to report a lost Passport
router.post('/lost-passport', reportLostPassport)

export default router;
