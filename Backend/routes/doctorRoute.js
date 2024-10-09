import express from 'express'
import { appointmentCancel, appointmentComplete, appointmentsDoctor, doctorDashboard, doctorList,doctorProfile,loginDoctor, updateDoctorProfile } from '../controllers/doctorController.js'

const doctorRouter = express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments/:docId',appointmentsDoctor)
doctorRouter.post('/cancel-appointment',appointmentCancel)
doctorRouter.post('/complete-appointment',appointmentComplete)
doctorRouter.get('/dashboard/:docId', doctorDashboard)
doctorRouter.get('/profile/:docId', doctorProfile)
doctorRouter.post('/update-profile/:docId', updateDoctorProfile)

export default doctorRouter