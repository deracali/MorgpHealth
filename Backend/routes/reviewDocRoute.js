// reviewDocRouter.js
import express from 'express';
import multer from 'multer'; // Ensure multer is imported
import upload from '../middlewares/multer.js'; // This remains as 'upload'
import { deleteReviewDoctor, getAllReviewDocs, getSingleReviewDoc, ReviewController, updateCancelledStatus } from '../controllers/reviewController.js';

const reviewDocRouter = express.Router();

// Configure multer for multiple file uploads, using the imported upload
const doctorUpload = upload.any()

reviewDocRouter.post('/reviewDoc', doctorUpload, ReviewController);
reviewDocRouter.put('/cancel/:id',  updateCancelledStatus);
reviewDocRouter.get('/review-docs', getAllReviewDocs);
reviewDocRouter.get('/review-docs/:id', getSingleReviewDoc)
reviewDocRouter.delete('/review-doctor/:doctorId', deleteReviewDoctor)

export default reviewDocRouter;
