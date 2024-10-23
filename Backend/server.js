import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongdb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
import insuranceRouter from './routes/insuranceRoute.js'
import WithdrawalRouter from './routes/withdrawalRoute.js'
import reviewDocRouter from './routes/reviewDocRoute.js'

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())

app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
app.use('/api/insurance',insuranceRouter)
app.use('/api/withdraws',WithdrawalRouter)
app.use('/api/reviewdoc',reviewDocRouter)

app.get('/', (req,res)=>{
    res.send('API WORKING')
})

app.listen(port, ()=>console.log("Server Started", port))