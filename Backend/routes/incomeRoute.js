import express from 'express'
import { addIncome, deleteIncome, getIncomes } from '../controllers/incomeController.js'


const incomeRouter = express.Router()

incomeRouter.post('/add-income',addIncome)
incomeRouter.get('/get-income',getIncomes)
incomeRouter.delete("/delete-income/:id", deleteIncome)


export default incomeRouter