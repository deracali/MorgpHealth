import express from 'express';
import { createStaff, staffLogin, updateOnlineDuration, getStaff } from '../controllers/staffController.js';

const staffRouter = express.Router();

// Route to create new staff
staffRouter.post('/create', createStaff);

// Route to log staff login
staffRouter.post('/login', staffLogin);

// Route to update online duration
staffRouter.post('/update-duration', updateOnlineDuration);

// Route to get all staff
staffRouter.get('/', getStaff);

export default staffRouter;
