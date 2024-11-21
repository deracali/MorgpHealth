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
import  notificationRouter from "./routes/notificationRoute.js";
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


app.post("/payment-sheet", async (req, res) => {
  try {
      const amount = req.body.amount
    // Step 1: Create a new customer or use an existing one
    const customer = await stripe.customers.create();

    // Step 2: Create an ephemeral key for the customer
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2020-08-27" } // Use the Stripe API version
    );

    // Step 3: Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: "usd",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true, // Use automatic payment methods
      },
    });

    // Step 4: Respond with the client secret, ephemeral key, and publishable key
    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: "pk_test_51QN8mWG2ozhLuxUAf8fdoD3MqAQnfNsZZoZdbc1fRx1fHUWRbpLjbGfdeR5VEAGOVCAUqH9hrlaJPQ5lEpAmrt7q00kPKajlEa",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
app.use("/api/notifications", notificationRouter);

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
