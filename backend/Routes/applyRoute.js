import express from 'express';
import authenticateToken from '../middlewares/authUser.js';
import { applyLostId, getAllFormUploads, getAllLostIdApplications, getUserLostIdApplications, getUserUploadedForms, userUploadsForms } from '../Controllers/applicationsController.js';
import upload from '../config/multerConfig.js';

const router = express.Router();

// POST request to apply for an ID
router.post('/apply-lostId', upload.single("passportPhoto"), authenticateToken, applyLostId);
router.get('/userLostIdApplications', authenticateToken, getUserLostIdApplications);
router.get('/lostIdApplications', authenticateToken, getAllLostIdApplications);


//Form upload route
router.post("/upload-forms", authenticateToken, upload.fields([{ name: "formA", maxCount: 1 }, { name: "formB", maxCount: 1 }, { name: "formC", maxCount: 1 },]), userUploadsForms);
router.get('/user-forms', authenticateToken, getUserUploadedForms);
router.get('/uploaded-forms', authenticateToken, getAllFormUploads);


export default router;