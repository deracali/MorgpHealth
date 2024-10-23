import express from 'express'
import { appointmentCancel, appointmentComplete, appointmentsDoctor, decrementDoctorBalance, doctorDashboard, doctorList,doctorProfile,loginDoctor, updateAppointment, updateDoctorProfile } from '../controllers/doctorController.js'


const doctorRouter = express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments/:docId',appointmentsDoctor)
doctorRouter.post('/cancel-appointment',appointmentCancel)
doctorRouter.post('/complete-appointment',appointmentComplete)
doctorRouter.get('/dashboard/:docId', doctorDashboard)
doctorRouter.get('/profile/:docId', doctorProfile)
doctorRouter.post('/update-profile/:docId', updateDoctorProfile)
doctorRouter.put('/update-appointment/:appointmentId',updateAppointment)
doctorRouter.put('/balance/decrement/:docId', decrementDoctorBalance);



export default doctorRouter