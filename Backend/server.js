import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongdb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
import insuranceRouter from './routes/insuranceRoute.js';
import WithdrawalRouter from './routes/withdrawalRoute.js';
import reviewDocRouter from './routes/reviewDocRoute.js';
import chatRoute from './routes/chatRoute.js';
import http from 'http'; // Import http module
import { Server } from 'socket.io'; // Import Socket.IO

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // or the correct frontend URL
    methods: ['GET', 'POST'],
     allowedHeaders: ['Content-Type', 'Authorization', 'token'], ,
  }));

// Define your routes
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);
app.use('/api/insurance', insuranceRouter);
app.use('/api/withdraws', WithdrawalRouter);
app.use('/api/addDoc', reviewDocRouter);
app.use('/api/chat', chatRoute);

app.get('/', (req, res) => {
    res.send('API WORKING');
});

// Create an HTTP server and bind it to your Express app
const server = http.createServer(app);

// Initialize Socket.IO and attach it to the HTTP server
const io = new Server(server, {
    cors: {
        origin: "*", // Adjust according to your client URL
        methods: ["GET", "POST"],
    },
});

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Listen for messages from clients
    socket.on('sendMessage', (message) => {
        // Broadcast the message to all connected clients
        io.emit('receiveMessage', message);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Start the server
server.listen(port, () => console.log(`Server started on port ${port}`));
