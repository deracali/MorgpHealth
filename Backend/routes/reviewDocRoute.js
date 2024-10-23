// reviewDocRouter.js
import express from 'express';
import multer from 'multer'; // Ensure multer is imported
import upload from '../middlewares/multer.js'; // This remains as 'upload'
import { ReviewDoctor } from '../controllers/reviewDocController.js';

const reviewDocRouter = express.Router();

// Configure multer for multiple file uploads, using the imported upload
const doctorUpload = upload.fields([
    { name: 'image', maxCount: 1 }, // Doctor's profile image
    { name: 'medicalLicense', maxCount: 1 }, // Medical license image
    { name: 'diplomaCertificates', maxCount: 1 }, // Diploma certificates image
    { name: 'proofOfID', maxCount: 1 } // Proof of ID image
]);

reviewDocRouter.post('/add-doctor', doctorUpload, ReviewDoctor);

export default reviewDocRouter;
