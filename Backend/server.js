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
import { initializeWebSocket } from './websocket.js';
import videoRouter from './routes/videoRoute.js';
import staffRouter from './routes/staffRoute.js';
import blogRouter from './routes/blogRoute.js';
import notificationRoute from "./routes/notificationRoute.js";
import Stripe from 'stripe';

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors({
    origin: '*', // or the correct frontend URL
    methods: ['GET', 'POST'],
     allowedHeaders: ['Content-Type', 'Authorization', 'token', 'dtoken', 'atoken'], 
  }));


// Initialize Stripe with the secret key from .env file
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


// Create a payment intent endpoint
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, appointmentId } = req.body; // Amount should be a normal number, not cents
    
    // Create a payment intent with the specified amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe requires the amount in cents, so multiply by 100
      currency: 'usd', // You can change this to your desired currency
    });

    // Respond with the client secret for the payment intent
    res.send({
      clientSecret: paymentIntent.client_secret,
    });

    // The frontend will confirm the payment using this client secret
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update appointment status endpoint (for successful payment)
app.post('/update-payment-status', async (req, res) => {
  const { appointmentId, paymentSuccessful } = req.body;

  try {
    const response = await fetch(`https://morgphealth.onrender.com/update-appointment/${appointmentId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentSuccessful }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Failed to update payment status' });
  }
});

// Define your routes
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);
app.use('/api/insurance', insuranceRouter);
app.use('/api/withdraws', WithdrawalRouter);
app.use('/api/addDoc', reviewDocRouter);
app.use('/api/chat', chatRoute);
app.use('/api/videos', videoRouter);
app.use('/api/staff', staffRouter);
app.use('/api/blogs', blogRouter);
app.use("/api/notifications", notificationRoute);

app.get('/', (req, res) => {
    res.send('API WORKING');
});

// Create an HTTP server and bind it to your Express app
const server = http.createServer(app);
initializeWebSocket(server);

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
