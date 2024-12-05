import express from 'express';
import { createRequest, deleteRequest, getAllRequests, getRequestById } from '../controllers/requestController.js';

const router = express.Router();

// Create a new request
router.post('/requests', createRequest);

// Delete a request by ID
router.delete('/requests/:id', deleteRequest);

// Get all requests
router.get('/requests', getAllRequests);

// Get a specific request by ID
router.get('/requests/:id', getRequestById);

export default router;
