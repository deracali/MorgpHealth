import express from 'express'
import { addInsurance, getInsurance } from '../controllers/insuranceController.js'

const insuranceRouter = express.Router()


insuranceRouter.post('/insurance',addInsurance)
insuranceRouter.get('/insurance/:userId',getInsurance)


export default insuranceRouter