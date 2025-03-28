import express from 'express';
import { getAllReports, reportedIds, reportedPassports, reportLostId, reportLostPassport } from '../Controllers/lostDocuments.js';
import authenticateToken from '../middlewares/authUser.js';

const router = express.Router();

// POST request to report a lost ID
router.post('/lost-id', authenticateToken, reportLostId);

//POST request to report a lost Passport
router.post('/lost-passport', authenticateToken, reportLostPassport)

// GET request to view all reported lost passports
router.get("/reported-ids", reportedIds);
router.get("/reported-passports", reportedPassports);

//Get all reported Documents for IDs and Passports
router.get('/reports', getAllReports);

export default router;
