import express from 'express'
import {addDoctor,adminDashboard,allDoctors,appointmentCancel,appointmentsAdmin,loginAdmin} from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailablity } from '../controllers/doctorController.js'

const adminRouter = express.Router()

adminRouter.post('/add-doctor',upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors',allDoctors)
adminRouter.post('/change-availability',changeAvailablity)
adminRouter.get('/appointments',appointmentsAdmin)
adminRouter.post('/cancel-appointment',appointmentCancel)
adminRouter.get('/dashboard',adminDashboard)

export default adminRouter