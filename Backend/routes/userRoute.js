import express from 'express'
import { bookAppointment, cancelAppointment, getProfile,updateProfileMobile, getProfileId, listAppointment, loginUser, registerUser, updateProfile } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

userRouter.get('/get-profile',getProfile)
userRouter.get('/get-profileId/:userId', getProfileId);
userRouter.post('/update-profile',upload.single("image"),updateProfile)
userRouter.post('/update-profilemobile',upload.single("image"),updateProfileMobile)
userRouter.post('/book-appointment',bookAppointment)
userRouter.get('/appointments/:userId',listAppointment)
userRouter.post('/cancel-appointment',cancelAppointment)
userRouter.get('/appointments/user/:userId', appointmentsByUser);

export default userRouter
